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

import os, sys, re, argparse, codecs
import subprocess, pwd, glob, shutil
import time, zipfile, traceback
from termcolor import colored

parser = argparse.ArgumentParser()
parser.add_argument('--apk', action='store', dest='apk_path', default='', help='''(absolute) path to APK''')
parser.add_argument('-v', action='version', version='AppMon APK Builder v0.1, Copyright 2016 Nishant Das Patnaik')

print """
     ___      .______   .______   .___  ___.   ______   .__   __. 
    /   \     |   _  \  |   _  \  |   \/   |  /  __  \  |  \ |  | 
   /  ^  \    |  |_)  | |  |_)  | |  \  /  | |  |  |  | |   \|  | 
  /  /_\  \   |   ___/  |   ___/  |  |\/|  | |  |  |  | |  . `  | 
 /  _____  \  |  |      |  |      |  |  |  | |  `--'  | |  |\   | 
/__/     \__\ | _|      | _|      |__|  |__|  \______/  |__| \__| 
					    github.com/dpnishant
                                                                  
"""

if len(sys.argv) < 3:
    parser.print_help()
    sys.exit(1)

results = parser.parse_args()
apk_path = results.apk_path
new_apk_path = ""
aligned_apk_path = ""
renamed_apk_path = ""

if not os.path.isfile(apk_path):
    print "[E] File doesn't exist: %s\n[*] Quitting!" % (apk_path)
    sys.exit(1)

SMALI_DIRECT_METHODS = """    .method static constructor <clinit>()V
    .locals 1

    .prologue
    const-string v0, "frida-gadget"

    invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V

    return-void
.end method

"""

SMALI_PROLOGUE = """    const-string v0, "frida-gadget"

    invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V

"""

WORK_DIR = "/tmp/appmon_apk"
LIB_FILE_PATH = "lib.zip"

lib_dir = ""
marker = 0
method_start = 0
method_end = 0
constructor_start = 0
constructor_end = 0
prologue_start = 0
header_range = range(0, 0)
footer_range = range(0, 0)
header_block = ""
footer_block = ""

try:
	if os.path.isdir(WORK_DIR):
		print "[I] Preparing work directory..."
		shutil.rmtree(WORK_DIR)
	os.makedirs(WORK_DIR)

	print "[I] Expanding APK..."
	apk_dump = subprocess.check_output(["aapt", "dump", "badging", apk_path])
	apk_permissions = subprocess.check_output(["aapt", "dump", "permissions", apk_path])
	package_name = apk_dump.split("package: name=")[1].split(" ")[0].strip("'\"\n\t ")
	manifest_file_path = os.path.join(WORK_DIR, package_name, "AndroidManifest.xml")
	launchable_activity = apk_dump.split("launchable-activity: name=")[1].split(" ")[0].strip("'\"\n\t ")
	launchable_activity_path = os.path.join(WORK_DIR, package_name, "smali", launchable_activity.replace(".", "/") + ".smali")

	new_apk_path = WORK_DIR + "/" + package_name + ".apk"
	subprocess.call(["cp", apk_path, new_apk_path])
	subprocess.call(["apktool", "--quiet", "decode", new_apk_path])
	subprocess.call(["mv", package_name, WORK_DIR])

	if not "uses-permission: name='android.permission.INTERNET'" in apk_permissions:
		print "[I] APK needs INTERNET permission"
		with codecs.open(manifest_file_path, 'r', 'utf-8') as f:
			manifest_file_contents = f.readlines()

		for line_num in range(0, len(manifest_file_contents)):
			if "android.permission.INTERNET" in manifest_file_contents[line_num]:
				manifest_file_contents.insert(line_num, "    <uses-permission android:name=\"android.permission.INTERNET\"/>\n")
				with codecs.open(manifest_file_path, 'w', 'utf-8') as f:
					manifest_file_contents = "".join(manifest_file_contents)
					f.write(manifest_file_contents)
				break
		
	print "[I] Searching .smali"
	with codecs.open(launchable_activity_path, 'r', 'utf-8') as f:
		file_contents = f.readlines()
	
	for line in range(0, len(file_contents)):
		if "# direct methods" in file_contents[line]:
			method_start = line
		if "# virtual methods" in file_contents[line]:
			method_end = line

	marker = method_start + 1

	if (method_end - method_start) > 1:
		for cursor in range(marker, method_end):
			if ".method static constructor <clinit>()V" in file_contents[cursor]:
				constructor_start = cursor
				marker = constructor_start + 1
				break
		for cursor in range(marker, method_end):
			if ".end method" in file_contents[cursor]:
				constructor_end = cursor + 1
				break
		for cursor in range(marker, constructor_end):
			if ".prologue" in file_contents[cursor]:
				prologue_start = cursor
				marker = cursor + 1
	
	header_range = range(0, marker)
	footer_range = range(marker, len(file_contents))

	for line_num in header_range:
		header_block += file_contents[line_num]
	for line_num in footer_range:
		footer_block += file_contents[line_num]

	if prologue_start > 1:
		renegerated_smali = header_block + SMALI_PROLOGUE + footer_block
	else:
		renegerated_smali = header_block + SMALI_DIRECT_METHODS + footer_block

	print "[I] Patching .smali" 
	with codecs.open(launchable_activity_path, 'w', 'utf-8') as f:
		f.write(renegerated_smali)

	print "[I] Injecting libs"
	lib_dir = os.path.join(WORK_DIR, package_name, "lib")
	if not os.path.isdir(lib_dir):
		os.makedirs(lib_dir)

	unzip_output = subprocess.check_output(["unzip", LIB_FILE_PATH, "-d", lib_dir])

	print "[I] Building APK"
	shutil.rmtree(os.path.join(WORK_DIR, package_name, "original/META-INF"))
	build_apk_output = subprocess.check_output(["apktool", "build", os.path.join(WORK_DIR, package_name)])

	new_apk_path = "%s/%s.apk" % (os.path.join(WORK_DIR, package_name, "dist"), package_name)
	aligned_apk_path = "%s/%s-signed-zipaligned.apk" % (os.path.join(WORK_DIR, package_name, "dist"), package_name)
	renamed_apk_path = "%s/%s.apk" % (os.path.join(WORK_DIR, package_name, "dist"), os.path.basename(apk_path).split(".apk")[0] + "-appmon")
	appmon_apk_path = os.path.join(os.getcwd(), os.path.basename(apk_path).split(".apk")[0] + "-appmon.apk")

	print "[I] Aligning APK"
	subprocess.check_output(["zipalign", "-v", "-p", "4", new_apk_path, aligned_apk_path])

	align_verify = subprocess.check_output(["zipalign", "-v", "-c", "4", aligned_apk_path])
	align_verify.strip(" \r\n\t")
	if not "Verification succesful" in align_verify:
		print "[E] alignment verification failed"
	else:
		print "[I] APK alignment verified"


	# 
	print "[I] Signing APK"
	subprocess.check_output(["jarsigner", "-tsa", "http://timestamp.digicert.com", 
		"-sigalg", "SHA1withRSA", "-digestalg", "SHA1", "-keystore", "appmon.keystore", "-storepass", "appmon", new_apk_path, "alias_name"])

	
	sign_verify = subprocess.check_output(["jarsigner", "-verify", "-tsa", "http://timestamp.digicert.com", 
		"-keystore", "appmon.keystore", "-verbose", "-certs", "-storepass", "appmon", new_apk_path, "alias_name"])
	if not "jar verified." in sign_verify:
		print sign_verify
	else:
		print "[I] APK signature verified"

	print "[I] Housekeeping"
	subprocess.call(["mv", new_apk_path, renamed_apk_path])
	subprocess.call(["mv", renamed_apk_path, os.getcwd()])

	if os.path.isfile(appmon_apk_path):
		print "[I] Ready: %s" % (appmon_apk_path)

except Exception as e:
	traceback.print_exc()
	sys.exit(1)