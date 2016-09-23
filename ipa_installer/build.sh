#!/bin/sh
mkdir apps
wget https://build.frida.re/frida/ios/lib/FridaGadget.dylib -O FridaGadget.dylib
git clone https://github.com/nowsecure/node-applesign && cd node-applesign && git checkout 095a38c7ab629b9103f68872b79ef53d68cb6291 && npm install
cd ..
npm install -g ios-deploy
git clone https://github.com/alexzielenski/optool && cd optool && git submodule update --init --recursive
cd optool/FSArgumentParser && git clone https://github.com/beelsebob/CoreParse && cd CoreParse && git checkout 1be510abdfffb33544272cd2ce82d4b0b3260723
cd ../../../
cd optool.xcodeproj && sed -i '' 's/SDKROOT = macosx10\.9/SDKROOT = macosx/g' project.pbxproj && cd ../
xcodebuild -project optool.xcodeproj && mkdir bin && cp build/Release/optool bin/ && cd ../
brew install ideviceinstaller