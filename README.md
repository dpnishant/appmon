![](https://raw.githubusercontent.com/dpnishant/appmon/master/resources/logo.png)
Welcome to AppMon!
==================
As seen at [![](https://www.toolswatch.org/badges/arsenal/2016.svg)](https://www.blackhat.com/us-16/arsenal.html#appmon) US & [![](https://www.toolswatch.org/badges/arsenal/2016.svg)](https://www.blackhat.com/eu-16/arsenal.html#appmon-runtime-security-testing-and-profiling-framework-for-native-apps) EU

AppMon is an automated framework for monitoring and tampering system API calls of native macOS, iOS and android apps. It is based on [**Frida**](http://www.frida.re).

This project was only possible because of **Ole André Vadla Ravnås** and I dedicate it to him. Follow him on [**GitHub**](https://github.com/oleavr), [**Twitter**](https://twitter.com/oleavr)

It consists of the following components:

* AppMon Sniffer - Intercept API calls to figure out interesting operations performed by an App
* Appmon Intruder - Manipulate API calls data to create change app's original behavior
* AppMon Android Tracer - Traces Java classes & methods within Android APKs
* AppMon IPA Installer - Creates and installs "inspectable" IPAs on non-jailbroken iOS devices
* AppMon APK Builder - Creates APKs "inspectable" on non-rooted Android devices

Follow the documentation below to learn more.

Documentation
=============

[Click Here](https://dpnishant.github.com/appmon/)
