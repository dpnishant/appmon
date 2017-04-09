#!/usr/bin/python

###
 # Copyright (c) 2016 Nishant Das Patnaik.
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 #
 #  http://www.apache.org/licenses/LICENSE-2.0
 #
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
###

import os, sys, argparse, time, codecs, binascii, frida, json, traceback, signal
from termcolor import colored

device = ''
session = ''
merged_script_path = '/tmp/merged.js'

print """
     ___      .______   .______   .___  ___.   ______   .__   __. 
    /   \     |   _  \  |   _  \  |   \/   |  /  __  \  |  \ |  | 
   /  ^  \    |  |_)  | |  |_)  | |  \  /  | |  |  |  | |   \|  | 
  /  /_\  \   |   ___/  |   ___/  |  |\/|  | |  |  |  | |  . `  | 
 /  _____  \  |  |      |  |      |  |  |  | |  `--'  | |  |\   | 
/__/     \__\ | _|      | _|      |__|  |__|  \______/  |__| \__| 
                        github.com/dpnishant
                                                                  
"""

def on_detached():
    print colored('[WARNING] "%s" has terminated!' % (app_name), 'red')

def _exit_():
    print colored('[INFO] Exiting...', 'green')
    try:
        script.unload()
        session.detach()
        os.remove(merged_script_path)
    except Exception as e:
        pass
    sys.exit(0)

def on_message(message, data):
    current_time = time.strftime("%H:%M:%S", time.localtime())
    if message['type'] == 'send':
        if json.loads(message['payload'])['status']:
            if json.loads(message['payload'])['status'] == 'end':
                print colored("[+] Done! Press Ctrl+C to continue...", "green")
        else:
            print current_time, message['payload']
    elif message['type'] == 'error':
        print current_time, message['stack']

def list_processes(session):
    print 'PID\tProcesses\n', '===\t========='
    for app in session.enumerate_processes():
        print "%s\t%s" % (app.pid, app.name)

def merge_scripts(path):
    global merged_script_path
    script_source = ''
    for root, dirs, files in os.walk(path):
        path = root.split('/')
        for file in files:
            script_path = os.path.join(root, file)
            if script_path.endswith('.js'):
                source = ''
                with codecs.open(script_path, 'r', 'utf-8') as f:
                    source = f.read()
                script_source += '/* ____%s/%s____ */\n\n' % (os.path.basename(root), file) + source + '\n\n'
    with codecs.open(merged_script_path, "w", "utf-8") as f:
        f.write(script_source)
    return merged_script_path

def generate_injection():
    injection_source = ''
    if os.path.isfile(script_path):
        with codecs.open(script_path, 'r', 'utf-8') as f:
            injection_source = f.read()
    elif os.path.isdir(script_path):
        with codecs.open(merge_scripts(script_path), 'r', 'utf-8') as f:
            injection_source = f.read()
    print colored('[INFO] Building injection...', 'yellow')
    return injection_source

def init_opts():
    parser = argparse.ArgumentParser()
    parser.add_argument('-a', action='store', dest='app_name', default='',
                    help='''Process Identifier;
                    Accepts "Twitter" for iOS; 
                    "com.twitter.android" for Android; "Twitter" for MacOS X''')
    parser.add_argument('-p', action='store', dest='platform', default='',
                    help='Platform Type; Accepts "ios", "android" or "mac"')
    parser.add_argument('--spawn', action='store', dest='spawn', default=0,
                    help='''Optional; Accepts 1=Spawn, 0=Attach; Needs "-p PLATFORM"''')
    parser.add_argument('-ls', action='store', dest='list_apps', default=0,
                    help='''Optional; Accepts 1 or 0; Lists running Apps on target device; Needs "-p PLATFORM"''')
    parser.add_argument('-s', action='store', dest='script_path', default='',
                    help='''Path to agent script file;
                    Can be relative/absolute path for a file or directory;
                    Multiple scripts in a directory shall be merged;
                    Needs "-a APP_NAME"''')
    parser.add_argument('-v', action='version', version='AppMon Intruder v0.1, Nishant Das Patnaik, 2016')
    
    results = parser.parse_args()
    app_name = results.app_name
    platform = results.platform
    script_path = results.script_path
    list_apps = results.list_apps
    spawn = int(results.spawn)

    if script_path != None and app_name == '' and list_apps == 0:
        parser.print_help()
        sys.exit(1)

    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)

    return app_name, platform, script_path, list_apps, spawn

def getDisplayName(session, app_name):
    try:
        script = session.create_script("""/* ____CFBundleDisplayName Getter for Gadget____ */
'use strict';
rpc.exports = {
  gadgetdisplayname: function () {
    if (ObjC.available) {
      var dict = ObjC.classes.NSBundle.mainBundle().infoDictionary();
      var iter = dict.keyEnumerator();
      var key = "";
      while ((key = iter.nextObject()) !== null) {
        if (key.toString() === "CFBundleDisplayName") {
          return dict.objectForKey_(key).toString();
        }
      }
    } else { return null; }
  }
};
""")
        script.load()
        if script.exports.gadgetdisplayname():
            app_name = script.exports.gadgetdisplayname()
        script.unload()
        return app_name
    except Exception as e:
        print colored("[ERROR] " + str(e), "red")
        traceback.print_exc()


def getBundleID(device, app_name, platform):
    try:
        session = device.attach(app_name)
        session.on('detached', on_detached)
        script = session.create_script("""'use strict';
rpc.exports = {
  iosbundleid: function () {
    return ObjC.classes.NSBundle.mainBundle().bundleIdentifier().toString();
  },
  macosbundleid: function () {
    return ObjC.classes.NSBundle.mainBundle().executablePath().toString();
  }
};
""")
        script.load()
        if platform == 'ios':
            bundleID = script.exports.iosbundleid()
        elif platform == 'macos':
            bundleID = script.exports.macosbundleid()
        script.unload()
        session.detach()
        return bundleID
    except Exception as e:
        print colored("[ERROR] " + str(e), "red")
        traceback.print_exc()

def init_session():
    try:
        session = None
        if platform == 'ios' or platform == 'android':
            try:
                device = frida.get_usb_device()
            except Exception as e:
                print colored(str(e), "red")
                traceback.print_exc()
                if platform == 'android':
                    print colored("Troubleshooting Help", "blue")
                    print colored("HINT: Is USB Debugging enabled?", "blue")
                    print colored("HINT: Is `frida-server` running on mobile device (with +x permissions)?", "blue")
                    print colored("HINT: Is `adb` daemon running?", "blue")
                    sys.exit(1)
                elif platform == "ios":
                    print colored("Troubleshooting Help", "blue")
                    print colored("HINT: Have you installed `frida` module from Cydia?", "blue")
                    print colored("HINT: Have used `ipa_installer` to inject the `FridaGadget` shared lbrary?", "blue")
                    sys.exit(1)
        elif platform == 'macos':
            device = frida.get_local_device()
        else:
            print colored('[ERROR] Unsupported Platform', 'red')
            sys.exit(1)
        pid = None
        if app_name:
            try:
                if platform == 'android' and spawn == 1:
                    print colored("Now Spawning %s" % app_name, "green")
                    pid = device.spawn([app_name])
                    session = device.attach(pid)
                elif (platform == 'ios' or platform == 'macos') and spawn == 1:
                    bundleID = getBundleID(device, app_name, platform)
                    #print pid
                    if bundleID:
                        print colored("Now Spawning %s" % bundleID, "green")
                        pid = device.spawn([bundleID])
                        #print pid
                        session = device.attach(pid)
                    else:
                        print colored("[ERROR] Can't spawn %s" % app_name, "red")
                        traceback.print_exc()
                        sys.exit(1)
                else:
                    session = device.attach(app_name)
            except Exception as e:
                print colored('[ERROR] ' + str(e), 'red')
                traceback.print_exc()
        if session:
            print colored('[INFO] Attached to %s' % (app_name), 'yellow')
            session.on('detached', on_detached)
    except Exception as e:
        print colored('[ERROR] ' + str(e), 'red')
        traceback.print_exc()
        sys.exit(1)
    return device, session, pid

try:
    app_name, platform, script_path, list_apps, spawn = init_opts()
    device, session, pid = init_session()

    if int(list_apps) == 1:
        list_processes(device)
        sys.exit(0)

    if session:
        if app_name == "Gadget":
            app_name = getDisplayName(session, app_name)
        script = session.create_script(generate_injection())
        if script:
            print colored('[INFO] Instrumentation started...', 'yellow')
            script.on('message', on_message)
            script.load()
            if spawn == 1 and pid:
                device.resume(pid)
except Exception as e:
    print colored('[ERROR] ' + str(e), 'red')
    traceback.print_exc()
    sys.exit(1)

def signal_handler(signal, frame):
    _exit_()

signal.signal(signal.SIGINT, signal_handler)
signal.pause()