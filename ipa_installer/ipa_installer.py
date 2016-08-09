#!/usr/bin/python

import os, sys, re, argparse, codecs, subprocess, pwd, glob, shutil, time, zipfile
from termcolor import colored

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
def ZipDir(inputDir, outputZip):
    '''Zip up a directory and preserve symlinks and empty directories'''
    zipOut = zipfile.ZipFile(outputZip, 'w', compression=zipfile.ZIP_DEFLATED)
    rootLen = len(os.path.dirname(inputDir))
    def _ArchiveDirectory(parentDirectory):
        contents = os.listdir(parentDirectory)
        #store empty directories
        if not contents:
            #http://www.velocityreviews.com/forums/t318840-add-empty-directory-using-zipfile.html
            archiveRoot = parentDirectory[rootLen:].replace('\\', '/').lstrip('/')
            zipInfo = zipfile.ZipInfo(archiveRoot+'/')
            zipOut.writestr(zipInfo, '')
        for item in contents:
            fullPath = os.path.join(parentDirectory, item)
            if os.path.isdir(fullPath) and not os.path.islink(fullPath):
                _ArchiveDirectory(fullPath)
            else:
                archiveRoot = fullPath[rootLen:].replace('\\', '/').lstrip('/')
                if os.path.islink(fullPath):
                    # http://www.mail-archive.com/python-list@python.org/msg34223.html
                    zipInfo = zipfile.ZipInfo(archiveRoot)
                    zipInfo.create_system = 3
                    # long type of hex val of '0xA1ED0000L',
                    # say, symlink attr magic...
                    zipInfo.external_attr = 2716663808L
                    zipOut.writestr(zipInfo, os.readlink(fullPath))
                else:
                    zipOut.write(fullPath, archiveRoot, zipfile.ZIP_DEFLATED)
    _ArchiveDirectory(inputDir)
    zipOut.close()
def getDeveloperId():
    for id in subprocess.check_output(["node-applesign/bin/ipa-resign.js", "-L"]).split("\n"):
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
    elif len(mobileprovision_path) == 1:
        mobileprovision_path = mobileprovision_path[0]
    else:
        mobileprovision_path = raw_input('There is no provision file in default lacation. Please provide the path:')
    if not os.path.isfile(mobileprovision_path):
        mobileprovision_path = raw_input('Provide the path to "embedded.mobileprovision" file: ')
    return mobileprovision_path
def getMachOExecutable(app_path):
    filenames = os.listdir(app_path)
    for filename in filenames:
        path = os.path.join(app_path, filename)
        if not os.path.isdir(path):
            output = subprocess.check_output(['file', path])
            if "Mach-O universal binary" in output:
                output = output.split(":")[0]
                break
    return os.path.join(app_path, output)
def getDeviceUUID():
    try:
        uuid = subprocess.check_output(["ideviceinfo"]).split("UniqueDeviceID: ")[1].split("\n")[0]
        if len(uuid) == 40:
            return uuid
        else:
            uuid = raw_input('Enter the device UUID: ')
            return uuid
    except Exception as e:
        print "Error: %s" % str(e)
results = parser.parse_args()
ipa_path = results.ipa_path
if not results.mobileprovision_path:
    mobileprovision_path = getMobileProvisionFile()

if not results.uuid:
    uuid = getDeviceUUID()
else:
    uuid = results.uuid

try:
    results.dev_indentity
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
extracted_resigned_path = os.path.join(os.getcwd(), resign_name)
gadget_name = "FridaGadget.dylib"
gadget_path = str(os.path.join(os.getcwd(), gadget_name))
# entitlements = "entitlements.plist"
# entitlements_path = str(os.path.join(os.getcwd(), entitlements))
if os.path.isdir(work_dir):
    shutil.rmtree(work_dir)
os.makedirs(work_dir)
subprocess.call(["cp", ipa_path, zip_filepath])
subprocess.call(["unzip", zip_filepath, "-d", unzip_filepath])
payload_path = os.path.join(os.path.abspath(unzip_filepath), "Payload/")
if os.listdir(payload_path)[0].endswith(".app"):
    app_name = os.listdir(payload_path)[0]
    app_path = os.path.join(payload_path, app_name)
    _CodeSignature_path = os.path.join(app_path, "_CodeSignature/")
    executable_filepath = getMachOExecutable(app_path)
    print executable_filepath
    injected_dylib_path = os.path.join(app_path, "FridaGadget.dylib")
subprocess.call(["rm", "-rf", _CodeSignature_path])
subprocess.call(["chmod", "755", "FridaGadget.dylib"])
subprocess.call(["cp", gadget_path, app_path])
subprocess.call([optool_path, "install", "-c", "load", "-p", "@executable_path/FridaGadget.dylib", "-t", executable_filepath])
subprocess.call(["codesign", "-fs", 'iPhone Developer', injected_dylib_path])
subprocess.call(["codesign", "-fs", 'iPhone Developer', app_path])
subprocess.call(["find", unzip_filepath, "-name", '".DS_Store"', "-type", "f", "-delete"])
shutil.make_archive(injected_zip_filepath.strip(".zip"), 'zip', unzip_filepath)
os.rename(injected_zip_filepath, injected_ipa_filepath)
shutil.copy(injected_ipa_filepath, os.getcwd())
subprocess.call(["node", iparesign_path, "--without-watchapp", "--identity", dev_identity, "--mobileprovision", mobileprovision_path, injected_ipa_filename])
shutil.copy(os.path.join(os.getcwd(), resigned_ipa_name), os.path.join(os.getcwd(), "%s.zip" % resign_name))
subprocess.call(["unzip", os.path.join(os.getcwd(), resigned_ipa_name), "-d", extracted_resigned_path])
subprocess.call(["rm", "-rf", work_dir])
subprocess.call(["rm", "-rf", os.path.join(os.getcwd(), "%s.zip" % resign_name)])
subprocess.call(["rm", "-rf", os.path.join(os.getcwd(), injected_ipa_filename)])
subprocess.call(["ideviceinstaller", "-u", uuid, "-i", "%s/Payload/%s" % (extracted_resigned_path, app_name)])
print(chr(27) + "[2J")
print "Success! Installed on device... :)"
time.sleep(2)
print 'NOTE: Wait till you see the message "%s", on the debugger console.' % colored("Frida: Listening on TCP port 27042", "red", attrs=["bold"])
time.sleep(1)
print 'NOTE: Keep the debugger running to continue using the app. To quit type "%s", in the debugger console.' % colored("quit", attrs=["bold"])
time.sleep(2)
print 'NOTE: The app will remain suspended until you run, (in a different terminal window/tab), \n%s' % colored("frida -U Gadget", "red", attrs=["bold"])
time.sleep(2)
message = """#!/bin/sh
# %s app launcher script generated by AppMon
# http://dpnishant.github.com/appmon

ios-deploy -i %s --noinstall -b %s/Payload/%s
""" % (unzip_filename, uuid, extracted_resigned_path, app_name)
launcher_path = 'sh ./%s/launch_%s.sh' % (resign_name, unzip_filename)
with codecs.open('%s/launch_%s.sh' % (extracted_resigned_path, unzip_filename), 'w', 'utf-8') as f:
    f.write(message)
time.sleep(2)
print 'NOTE: To launch the installed app, in future, run: \n%s\n' % colored(launcher_path, "blue", attrs=["bold"])
time.sleep(2)
print colored("Launching in 10 seconds...")
time.sleep(10)
subprocess.call(["ios-deploy", "-i", uuid, "--noinstall", "-b", "%s/Payload/%s" % (extracted_resigned_path, app_name)])
sys.exit(0)
