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

import os, sys, argparse, time, codecs, binascii, frida, json, traceback, subprocess, tempfile
from flask import Flask, request, render_template
from termcolor import colored
import database as db
import platform as platform_module

print("""
     ___      .______   .______   .___  ___.   ______   .__   __. 
    /   \     |   _  \  |   _  \  |   \/   |  /  __  \  |  \ |  | 
   /  ^  \    |  |_)  | |  |_)  | |  \  /  | |  |  |  | |   \|  | 
  /  /_\  \   |   ___/  |   ___/  |  |\/|  | |  |  |  | |  . `  | 
 /  _____  \  |  |      |  |      |  |  |  | |  `--'  | |  |\   | 
/__/     \__\ | _|      | _|      |__|  |__|  \______/  |__| \__| 
                        github.com/dpnishant
                                                                  
""")

app = Flask(__name__, static_url_path='/static')
#app.debug = True

device = ''
session = ''
temp_dir = tempfile.mkdtemp()
merged_script_path = os.path.join(temp_dir,'merged.js')
APP_LIST = []


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


@app.route('/api/fetch', methods=['GET'])
def serve_json():
    index = request.args.get('id')
    if request.args.get('reportdb'):
        db_name = request.args.get('reportdb')
    else:
        db_name = request.args.get('app')
    response = db.read_from_database(db_name, index)
    #response = open('static/data.json').read()
    return response


@app.route('/monitor/', methods=['GET'])
def monitor_page():
    app_name = request.args.get('app')
    return render_template('monitor.html', app_name=app_name)


@app.route('/', methods=['GET'])
def landing_page():
    global APP_LIST, DB_MAP

    app_dumps_dir = os.path.join('.','app_dumps')
    for root, dirs, files in os.walk(app_dumps_dir):
        path = root.split(os.sep)
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.endswith('.db'):
                APP_LIST.append(file.replace('.db', ''))

    return render_template('index.html', apps=APP_LIST)


def init_opts():
    parser = argparse.ArgumentParser()
    parser.add_argument('-a', action='store', dest='app_name', default='',
                    help='''Process Name;
                    Accepts "Twitter" for iOS; 
                    "com.twitter.android" for Android; "Twitter" for macOS''')
    parser.add_argument('--spawn', action='store', dest='spawn', default=0,
                    help='''Optional; Accepts 1=Spawn, 0=Attach; Needs "-p PLATFORM"''')
    parser.add_argument('-p', action='store', dest='platform',
                    help='Platform Type; Accepts "ios", "iossim", "android" or "macos"')
    parser.add_argument('-s', action='store', dest='script_path', default='',
                    help='''Path to agent script file;
                    Can be relative/absolute path for a file or directory;
                    Multiple scripts in a directory shall be merged;
                    Needs "-a APP_NAME"''')
    parser.add_argument('-o', action='store', dest='output_dir',
                    help='''(Optional) Path to store any dumps/logs;
                    Accepts relative/absolute paths''')
    parser.add_argument('-r', action='store', dest='report',
                        help='Report database name (Default is <appname>.db')
    parser.add_argument('-ls', action='store', dest='list_apps', default=0,
                    help='''Optional; Accepts 1 or 0; Lists running Apps on target device; Needs "-p PLATFORM"''')
    parser.add_argument('-v', action='version', version='AppMon Sniffer v0.1, Nishant Das Patnaik, 2016')

    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)

    global output_dir, report_name


    results = parser.parse_args()
    app_name = results.app_name
    platform = results.platform
    script_path = results.script_path
    list_apps = int(results.list_apps)
    spawn = int(results.spawn)
    
    output_dir = results.output_dir if results.output_dir else os.path.join('.','app_dumps')

    report_name = results.report if results.report else app_name



    if script_path is not None and app_name == '' and list_apps == 0:
        parser.print_help()
        sys.exit(1)

    return app_name, platform, script_path, list_apps, output_dir, spawn


def merge_scripts(path):
    global merged_script_path
    script_source = ''
    if os.path.isfile(merged_script_path):
        source = ''
        with codecs.open(merged_script_path, 'r', 'utf-8') as f:
            source = f.read()
        script_source = source
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


def _exit_():
    print((colored('[INFO] Exiting...', 'green')))
    try:
        os.remove(merged_script_path)
    except Exception as e:
        pass
    sys.exit(0)


def writeBinFile(fname, data):
    with codecs.open(fname, "a", "utf-8") as f:
        f.write(data + '\r\n\r\n')


def list_processes(session):
    print(('PID\tProcesses\n', '===\t========='))
    for app in session.enumerate_processes():
        print(("%s\t%s" % (app.pid, app.name)))


def on_detached():
    print((colored('[WARNING] "%s" has terminated!' % (app_name), 'red')))


def on_message(message, data):
    os_string = platform_module.system()
    if os_string == "Windows":
        current_time = time.strftime('%b %d %Y %I:%M %p', time.localtime())
    else:
        current_time = time.strftime('%b %d %Y %l:%M %p', time.localtime())

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    if message['type'] == 'send':
        writePath = os.path.join(output_dir, str(report_name) + '.db')
        db.save_to_database(writePath, message['payload'])
        #writePath = os.path.join(output_dir, app_name + '.json')
        #writeBinFile(writePath, message['payload']) #writeBinFile(writePath, binascii.unhexlify(message['payload']))
        print((colored('[%s] Dumped to %s' % (current_time, writePath), 'green')))
    elif message['type'] == 'error':
        print((message['stack']))


def generate_injection():
    injection_source = ''
    if os.path.isfile(script_path):
        with codecs.open(script_path, 'r', 'utf-8') as f:
            injection_source = f.read()
    elif os.path.isdir(script_path):
        merge_scripts("scripts/!Common")
        with codecs.open(merge_scripts(script_path), 'r', 'utf-8') as f:
            injection_source = f.read()
    print((colored('[INFO] Building injection...', 'yellow')))
    return injection_source


def getDisplayName(session, app_name, platform):
    try:
        str_script = ""
        if platform == "ios":
            str_script = """/* ____CFBundleDisplayName Getter for iOS Gadget____ */
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
"""
            script = session.create_script(str_script)
            script.load()
            if script.exports.gadgetdisplayname:
                app_name = script.exports.gadgetdisplayname()
            script.unload()
            return app_name
        elif platform == "android":
            str_script = """/* ____ getPackageName Getter for Android Gadget____ */
'use strict';
rpc.exports = {
  gadgetdisplayname: function () {
    var appName = "";
    Java.perform(function(argument) {
        const ActivityThread = Java.use('android.app.ActivityThread');
        const app = ActivityThread.currentApplication();
        appName = app.toString().split("@")[0];
    });
    return appName;
}};
"""
            script = session.create_script(str_script)
            script.load()
            if script.exports.gadgetdisplayname:
                app_name = script.exports.gadgetdisplayname()
            script.unload()
            return app_name
    except Exception as e:
        print((colored("[ERROR] " + str(e), "red")))
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
        print((colored("[ERROR] " + str(e), "red")))
        traceback.print_exc()

def init_session():
    try:
        session = None
        if platform == 'ios' or platform == 'android':
            try:
                device = frida.get_usb_device(3) # added timeout to wait for 3 seconds
            except Exception as e:
                print((colored(str(e), "red")))
                traceback.print_exc()
                if platform == 'android':
                    print((colored("Troubleshooting Help", "blue")))
                    print((colored("HINT: Is USB Debugging enabled?", "blue")))
                    print((colored("HINT: Is `frida-server` running on mobile device (with +x permissions)?", "blue")))
                    print((colored("HINT: Is `adb` daemon running?", "blue")))
                    sys.exit(1)
                elif platform == "ios":
                    print((colored("Troubleshooting Help", "blue")))
                    print((colored("HINT: Have you installed `frida` module from Cydia?", "blue")))
                    print((colored("HINT: Have used `ipa_installer` to inject the `FridaGadget` shared lbrary?", "blue")))
                    sys.exit(1)
        elif platform == 'iossim':
            try:
                device = frida.get_remote_device()
            except Exception as e:
                # print traceback.print_exc()
                print((colored("Troubleshooting Help", "blue")))
                print((colored("HINT: Have you successfully integrated the FridaGadget dylib with the XCode Project?", "blue")))
                print((colored("HINT: Do you see a message similar to \"[Frida INFO] Listening on 127.0.0.1 TCP port 27042\" on XCode console logs?", "blue")))
                sys.exit(1)
        elif platform == 'macos':
            device = frida.get_local_device()
        else:
            print((colored('[ERROR] Unsupported Platform', 'red')))
            sys.exit(1)
        pid = None
        if app_name:
            try:
                if platform == 'android' and spawn == 1:
                    print((colored("Now Spawning %s" % app_name, "green")))
                    pid = device.spawn([app_name])
                    #time.sleep(5)
                    session = device.attach(pid)
                    #time.sleep(5)
                elif (platform == 'ios' or platform == 'macos') and spawn == 1:
                    bundleID = getBundleID(device, app_name, platform)
                    if bundleID:
                        print((colored("Now Spawning %s" % bundleID, "green")))
                        pid = device.spawn([bundleID])
                        #time.sleep(5)
                        session = device.attach(pid)
                    else:
                        print((colored("[ERROR] Can't spawn %s" % app_name, "red")))
                        traceback.print_exc()
                        sys.exit(1)
                else:
                    arg_to_attach = app_name
                    if app_name.isdigit():
                        arg_to_attach = int(app_name)

                    session = device.attach(arg_to_attach)
            except Exception as e:
                print((colored('[ERROR] ' + str(e), 'red')))
                traceback.print_exc()
        if session:
            print((colored('[INFO] Attached to %s' % (app_name), 'yellow')))
            session.on('detached', on_detached)
    except Exception as e:
        print((colored('[ERROR] ' + str(e), 'red')))
        traceback.print_exc()
        sys.exit(1)
    return device, session, pid

try:
    app_name, platform, script_path, list_apps, output_dir, spawn = init_opts()
    device, session, pid = init_session()

    if int(list_apps) == 1:
        list_processes(device)
        sys.exit(0)

    if session:
        if app_name == "Gadget":
            app_name = getDisplayName(session, app_name, platform)
        script = session.create_script(generate_injection())
        if script:
            print((colored('[INFO] Instrumentation started...', 'yellow')))
            script.on('message', on_message)
            script.load()
            if spawn == 1 and pid:
                device.resume(pid)
            app.run() #Start WebServer
except Exception as e:
    print((colored('[ERROR] ' + str(e), 'red')))
    traceback.print_exc()
    sys.exit(1)

try:
    while True:
        pass
except KeyboardInterrupt:
    script.unload()
    session.detach()
    _exit_()
