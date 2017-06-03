#!/bin/bash
mkdir lib
cd lib
wget -qO - https://github.com/frida/frida/releases/latest | grep -o "\/frida\/frida\/releases\/download\/.*\/frida-gadget-.*-android-.*\.so\.xz" | sed 's/\/frida\/frida/https:\/\/github\.com\/frida\/frida/g' | sed 's/%0A/\n/g' > list.txt
wget -i list.txt
unxz *.xz
mkdir arm64 arm64-v8a armeabi armeabi-v7a x86 x86_64
cp *-arm64.so arm64
mv arm64/*.so arm64/libfrida-gadget.so
cp *-arm64.so arm64-v8a
mv arm64-v8a/*.so arm64-v8a/libfrida-gadget.so
cp *-arm.so armeabi
mv armeabi/*.so armeabi/libfrida-gadget.so
cp *-arm.so armeabi-v7a
mv armeabi-v7a/*.so armeabi-v7a/libfrida-gadget.so
cp *-x86.so x86
mv x86/*.so x86/libfrida-gadget.so
cp *-x86_64.so x86_64
mv x86_64/*.so x86_64/libfrida-gadget.so
find . -name ".DS_*" -type f -delete
find . -name "*~*" -type f -delete
rm -rf *.so
rm -rf list.txt
zip -r ../lib.zip *
cd ..
rm -rf lib/
