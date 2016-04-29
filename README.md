Welcome to AppMon!
==================

This project was only possible because of **Ole André Vadla Ravnås** and I dedicate it to him.
Follow him: [**GitHub**](https://github.com/oleavr) [**Twitter**](https://twitter.com/oleavr)

_TL;DR_
AppMon is an automated framework for monitoring and tampering system API calls of native iOS and Android apps. You may call it the [**GreaseMonkey**](https://en.wikipedia.org/wiki/Greasemonkey) for native mobile apps. ;-)

----------

Motivation
-------------

Being a big fan of the Sysinternals Suite (acquired by Microsoft) and the recent spike in the number of mobile app releases we see an increase in Mobile app security assessments and the lack of toolset for doing it easily and thoroughly, easily, became the motivation for this idea. 

AppMon is my vision is to make become the iOS/Android equivalent of the this project [**apimonitor**](http://www.rohitab.com/apimonitor) and [**GreaseMonkey**](https://en.wikipedia.org/wiki/Greasemonkey). This should become a useful tool for the mobile penetration testers to not only monitor the app’s overall activity and focus on things that seem suspicious, as a starting point but also use pre-defined user-scripts to modify the app’s functionality/logic in the runtime e.g. spoofing the DeviceID, spoofing the GPS co-ordinates, faking In-App purchases etc. 

And as the tool matures, with time (i.e. as I get more spare time) we can have even more refinement as to add pattern detection into this monitoring where we can tag/classify the data (e.g. PII etc.) 

Dynamic instrumentation of native mobile apps is not something new to us, there are tools, available since 2011, to do one or the other thing. But those tools (say [**Introspy**](https://isecpartners.github.io/Introspy-iOS/)) are not as flexible as this one i.e. extending the capabilities and adding new features is very hard and cumbersome process. And more over they are very tightly bound to a specific version of the OS.

To build this I’m currently using the reverse-engineering & dynamic instrumentation framework called [**Frida**](http://www.frida.re). The best thing about it is that it supports instrumentation on Windows, Linux, Mac, iOS, Android via JavaScript (as its powered by [**Chrome V8**](https://developers.google.com/v8/) & [**Capstone Engine**](http://www.capstone-engine.org/)) which gets injected into the target process. While researching for the right platform to build the tool, I studied [**Cycript**](http://www.cycript.org/) (requires [**Cydia Substrate**](http://www.cydiasubstrate.com/)), [**Xposed Framework**](http://repo.xposed.info/) (specific to Android only and it’s instrumentation methodology is really old-school and slow). Hence to save some effort on the learning curve I planned to use Frida as Javascript is something I’m really comfortable with plus it has support for both Node.JS and Python bindings to write standalone apps. In short, Frida is *the* platform going forward.

In the current phase of the project, I’m concentrating on iOS and eventually Android. So far I have grouped the methods of interesting classes into logical categories of APIs that I’m going to intercept/manipulate into e.g.
> **Categories:**
> - Disk I/O (R/W)
> - Network (HTTP GET, POST etc.)
> - Crypto (HMAC, Hash function, block ciphers, X.509 certs etc.)
> - XML/JSON
> - KeyChain
> - Database (e.g. SQLite)
> - WebView
> - UserDefaults (SharedPreferences equiv.) & more.

In the current release, we have the ability to hook both the Apple’s CoreFoundation API’s as well as the Objective-C methods (even if its done in a Swift app via the bridging header). Swift support is not yet available in frida-gum and hence we'll have to wait until then. All I want to from you all is to watch the Video Demo (link above), take a look at the source-code and then provide your feedbacks/comments/suggestions/rants. And also it would be really helpful if you can provide me and missing feature you would like to see in the tool.


Usage
-------------

####AppMon Sniffer
```
usage: appmon.py [-h] [-a APP_NAME] [-p PLATFORM] [-s SCRIPT_PATH]
                 [-o OUTPUT_DIR] [-ls LIST_APPS] [-v]

optional arguments:
  -h, --help      show this help message and exit
  -a APP_NAME     Process Name; Accepts "Twitter" for iOS;
                  "com.twitter.android" for Android; "Twitter" for MacOS X
  -p PLATFORM     Platform Type; Accepts "ios", "android" or "mac"
  -s SCRIPT_PATH  Path to agent script file; Can be relative/absolute path for
                  a file or directory; Multiple scripts in a directory shall
                  be merged; Needs "-a APP_NAME"
  -o OUTPUT_DIR   (Optional) Path to store any dumps/logs; Accepts
                  relative/absolute paths
  -ls LIST_APPS   Optional; Accepts 1 or 0; Lists running Apps on target
                  device; Needs "-p PLATFORM"
  -v              show program's version number and exit
```
-----
####AppMon Intruder
```
usage: appintruder.py [-h] [-a APP_NAME] [-p PLATFORM] [-ls LIST_APPS]
                      [-s SCRIPT_PATH] [-v]

optional arguments:
  -h, --help      show this help message and exit
  -a APP_NAME     Process Identifier; Accepts "Twitter" for iOS;
                  "com.twitter.android" for Android; "Twitter" for MacOS X
  -p PLATFORM     Platform Type; Accepts "ios", "android" or "mac"
  -ls LIST_APPS   Optional; Accepts 1 or 0; Lists running Apps on target
                  device; Needs "-p PLATFORM"
  -s SCRIPT_PATH  Path to agent script file; Can be relative/absolute path for
                  a file or directory; Multiple scripts in a directory shall
                  be merged; Needs "-a APP_NAME"
  -v              show program's version number and exit
```
----------


Screenshots
-------------------


![Screenshot#1](https://raw.githubusercontent.com/dpnishant/appmon/master/screenshots/1.png?raw=true "Screenshot#1")



![Screenshot#2](https://raw.githubusercontent.com/dpnishant/appmon/master/screenshots/2.png?raw=true "Screenshot#2")



![Screenshot#3](https://raw.githubusercontent.com/dpnishant/appmon/master/screenshots/3.png?raw=true "Screenshot#3")



![Screenshot#4](https://raw.githubusercontent.com/dpnishant/appmon/master/screenshots/4.png?raw=true "Screenshot#4")
