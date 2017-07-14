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

import os, sys, re, argparse, codecs, subprocess, pwd, glob, shutil, time, zipfile, traceback, plistlib
from termcolor import colored

print """
     ___      .______   .______   .___  ___.   ______   .__   __. 
    /   \     |   _  \  |   _  \  |   \/   |  /  __  \  |  \ |  | 
   /  ^  \    |  |_)  | |  |_)  | |  \  /  | |  |  |  | |   \|  | 
  /  /_\  \   |   ___/  |   ___/  |  |\/|  | |  |  |  | |  . `  | 
 /  _____  \  |  |      |  |      |  |  |  | |  `--'  | |  |\   | 
/__/     \__\ | _|      | _|      |__|  |__|  \______/  |__| \__| 
                        github.com/dpnishant
                                                                  
"""

parser = argparse.ArgumentParser()
parser.add_argument('-ipa', action='store', dest='ipa_path', default='',
                                        help='''(Absolute) Path to IPA''')
parser.add_argument('-mobileprovision', action='store', dest='mobileprovision_path', default='',
                                        help='''(Absolute) Path to embedded.mobileprovision (OPTIONAL)''')
parser.add_argument('-identity', action='store', dest='dev_identity', default='',
                                        help='''Developer Identity Hash (OPTIONAL)''')
parser.add_argument('-uuid', action='store', dest='uuid', default='',
                                        help='''Device UUID (OPTIONAL)''')
parser.add_argument('-v', action='version', version='AppMon IPA Installer v0.1, Copyright 2016 Nishant Das Patnaik')

if len(sys.argv) < 2:
    parser.print_help()
    sys.exit(1)

if not os.path.isdir(os.path.join(os.getcwd(), "apps")):
    os.makedirs(os.path.join(os.getcwd(), "apps"))

def deviceError():
    print "%s" % colored("Error: Is the device connected over USB?", "red", attrs=["bold"])
    sys.exit(255)

def getDeveloperId():
    for id in subprocess.check_output(["node", "node-applesign/bin/ipa-resign.js", "-L"]).split("\n"):
        if "iPhone Developer:" in id:
            return id.split(" ")[0]
        else:
            print "No \"iPhone Developer\" identity found!"
            devID = raw("Enter \"iPhone Developer\" Identity Hash: ")
            return devID

def getMobileProvisionFile():
    PATH = "/Users/%s/Library/Developer/Xcode/DerivedData" % pwd.getpwuid(os.getuid())[0]
    mobileprovision_path = [os.path.join(dp, f) for dp, dn, filenames in os.walk(PATH) for f in filenames if os.path.splitext(f)[1] == '.mobileprovision']
    if len(mobileprovision_path) > 1:
        for path in mobileprovision_path:
            print "%s: %s" % (str(mobileprovision_path.index(path)), path)
        path_index = raw_input('Choose Provision file for IPA re-signing? (e.g. 0, 1...): ')
        mobileprovision_path = mobileprovision_path[int(path_index)]
    else:
        mobileprovision_path = mobileprovision_path[0]
    if not os.path.isfile(mobileprovision_path):
        mobileprovision_path = raw_input('Provide the path to "embedded.mobileprovision" file: ')
    return mobileprovision_path

def getMachOExecutable(app_path):
    try:
        plist_path = os.path.join(app_path, "Info.plist")
        plist = plistlib.readPlist(plist_path)
        executable = plist["CFBundleExecutable"]
        return os.path.join(app_path, executable)
    except Exception as _error:
        try:
            filenames = os.listdir(app_path)
            for filename in filenames:
                path = os.path.join(app_path, filename)
                if not os.path.isdir(path):
                    output = subprocess.check_output(['file', path])
                    if "Mach-O" in output:
                        output = output.split(":")[0]
                        break
            return os.path.join(app_path, output)
        except Exception as __error:
            print traceback.print_exc() 

def getDeviceUUID():
    try:
        print "[+] Trying to detect device..."
        uuid = subprocess.check_output(["sudo", "ideviceinfo", "-s"]).split("UniqueDeviceID: ")[1].split("\n")[0]
        device_conn = subprocess.check_output(["sudo", "ios-deploy", "-i", uuid, "--no-wifi", "-c"])
        if "Found %s (" % (uuid) in device_conn:
            print "[+] Found %s connected through USB." % colored(device_conn.split("Found")[1].strip().split(" connected through USB.")[0], "green", attrs=["bold"])
            time.sleep(1)
        else:
            print uuid, device_conn
            deviceError()
    except Exception as e:
            print str(e)
            deviceError()

    return uuid

results = parser.parse_args()
ipa_path = results.ipa_path

if not results.mobileprovision_path:
    mobileprovision_path = getMobileProvisionFile()

if not results.uuid:
    uuid = getDeviceUUID()
else:
    uuid = results.uuid

try:
    if len(results.dev_identity) == 40:
        dev_identity = results.dev_identity
    else:
        dev_identity = getDeveloperId()
except AttributeError:
    dev_identity = getDeveloperId()

work_dir = "/tmp/appmon_ipa/"
unzip_filename = os.path.basename(ipa_path).split(".")[0]
unzip_filepath = os.path.join(work_dir, unzip_filename)
zip_filepath = os.path.join(work_dir, "%s.zip" % unzip_filename)
optool_path = "optool/bin/optool"
injected_zip_filename = "%s-injected.zip" % unzip_filename
injected_zip_filepath = os.path.join(work_dir, injected_zip_filename)
injected_ipa_filename = "%s-injected.ipa" % unzip_filename
injected_ipa_filepath = os.path.join(work_dir, injected_ipa_filename)
iparesign_path = "node-applesign/bin/ipa-resign.js"
resign_name = "%s-injected-resigned" % unzip_filename
resigned_ipa_name = "%s.ipa" % resign_name
extracted_resigned_path = os.path.join(os.getcwd(), "apps", resign_name)
gadget_name = "FridaGadget.dylib"
gadget_path = str(os.path.join(os.getcwd(), gadget_name))

if os.path.isdir(work_dir):
    shutil.rmtree(work_dir)

os.makedirs(work_dir)
subprocess.call(["cp", ipa_path, zip_filepath])
print "[+] Unpacking IPA..."
subprocess.check_output(["unzip", zip_filepath, "-d", unzip_filepath])
payload_path = os.path.join(os.path.abspath(unzip_filepath), "Payload/")

if os.listdir(payload_path)[0].endswith(".app"):
    app_name = os.listdir(payload_path)[0]
    app_path = os.path.join(payload_path, app_name)
    _CodeSignature_path = os.path.join(app_path, "_CodeSignature/")
    executable_filepath = getMachOExecutable(app_path)
    #print executable_filepath
    injected_dylib_path = os.path.join(app_path, "FridaGadget.dylib")

subprocess.check_output(["rm", "-rf", _CodeSignature_path])
subprocess.check_output(["chmod", "755", "FridaGadget.dylib"])
subprocess.check_output(["cp", gadget_path, app_path])
print "[+] Injecting DYLIB..."
subprocess.check_output([optool_path, "install", "-c", "load", "-p", "@executable_path/FridaGadget.dylib", "-t", executable_filepath])
print "[+] Code-signing..."
subprocess.check_output(["codesign", "-fs", 'iPhone Developer', injected_dylib_path])
subprocess.check_output(["codesign", "-fs", 'iPhone Developer', app_path])
subprocess.check_output(["find", unzip_filepath, "-name", '".DS_Store"', "-type", "f", "-delete"])
shutil.make_archive(injected_zip_filepath.strip(".zip"), 'zip', unzip_filepath)
os.rename(injected_zip_filepath, injected_ipa_filepath)
shutil.copy(injected_ipa_filepath, os.getcwd())
subprocess.check_output(["node", iparesign_path, "--without-watchapp", "--identity", dev_identity, "--mobileprovision", mobileprovision_path, injected_ipa_filename])
shutil.copy(os.path.join(os.getcwd(), resigned_ipa_name), os.path.join(os.getcwd(), "%s.zip" % resign_name))
subprocess.check_output(["unzip", os.path.join(os.getcwd(), resigned_ipa_name), "-d", extracted_resigned_path])
subprocess.check_output(["rm", "-rf", work_dir])
subprocess.check_output(["rm", "-rf", os.path.join(os.getcwd(), "%s.zip" % resign_name)])
subprocess.check_output(["rm", "-rf", os.path.join(os.getcwd(), injected_ipa_filename)])
subprocess.check_output(["mv", "./%s" % resigned_ipa_name, "apps/"])
#subprocess.call(["sudo", "ideviceinstaller", "-u", uuid, "-i", "%s/Payload/%s" % (extracted_resigned_path, app_name)])
print "[+] Installing IPA..."
subprocess.check_output(["sudo", "ios-deploy", "-v", "--no-wifi", "-i", uuid, "-b", "%s/Payload/%s" % (extracted_resigned_path, app_name)])
#print(chr(27) + "[2J")
time.sleep(2)
print "%s" % colored("----------------HELP----------------", "green", attrs=["bold"])
print '[+] Wait for "%s", on the debugger console to initialize' % colored("60 seconds", "red", attrs=["bold"])
time.sleep(1)
print '[+] Keep the debugger running to continue using the app. To quit type "%s", in the debugger console.' % colored("quit", attrs=["bold"])
time.sleep(2)
print '[+] The app will remain suspended until you run, (in a different terminal window/tab), \n%s' % colored("frida -U Gadget", "red", attrs=["bold"])
time.sleep(2)
print "[+] Generating launch script..."
message = """#!/bin/sh
# %s app launcher script generated by AppMon
# http://dpnishant.github.com/appmon

sudo ios-deploy -d --no-wifi -i %s --noinstall -b %s/Payload/%s
""" % (unzip_filename, uuid, extracted_resigned_path, app_name)
launcher_path = 'sh ./%s/launch_%s.sh' % (resign_name, unzip_filename)
with codecs.open('%s/launch_%s.sh' % (extracted_resigned_path, unzip_filename), 'w', 'utf-8') as f:
    f.write(message)

time.sleep(2)

print 'NOTE: To launch the installed app, in future, run: \n%s\n' % colored(launcher_path, "blue", attrs=["bold"])
print "%s" % colored("------------------------------------", "green", attrs=["bold"])
time.sleep(2)
print colored("[+] Starting app...")
time.sleep(2)
subprocess.call(["sudo", "ios-deploy", "-v", "--no-wifi", "-i", uuid, "--noinstall", "-b", "%s/Payload/%s" % (extracted_resigned_path, app_name)])
sys.exit(0)
