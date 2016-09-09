#!/usr/bin/python

###
 # Copyright (c) 2016 eBay Software Foundation.
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

import os, sys, frida, re, argparse, codecs, json
from termcolor import colored

parser = argparse.ArgumentParser()
parser.add_argument('-a', action='store', dest='app_name', default='',
                                        help='''Process Name;
                                        Accepts "com.twitter.android"''')
parser.add_argument('-c', action='store', dest='class_name', default='',
                                        help='''Class Name;
                                        Example: "OpenSSL*SHA*"''')
parser.add_argument('-m', action='store', dest='method_name', default='',
                                        help='''Method Name;
                                        Example: "digest"; NOTE: Wildcard pattern is *NOT* supported''')

parser.add_argument('-v', action='version', version='AppMon Android Method Tracer v0.1, Copyright 2016 Nishant Das Patnaik')

if len(sys.argv) < 2:
    parser.print_help()
    sys.exit(1)

results = parser.parse_args()
appName = results.app_name
className = results.class_name
classCandidates = []
method = results.method_name

if len(className) >= 1 and len(className) < 3:
    print colored("[ERROR] Class Name should be at least 3 characters", "red")
    sys.exit(1)

def on_message(message, data):
    if message['type'] == 'send':
        payload = json.loads(message['payload'])
        if payload['type'] == "classEnum":
            classCandidates.append([ payload['className'], payload['overloads'] ])
            print '[FOUND] in "%s"' % colored(payload['className'], "magenta", attrs=["bold"])
        elif payload['type'] == "methodTrace":
            payload['overloadIndex']
            print "%(methodName)s \n\tCalled by: %(caller)s \n\tDefined at: %(className)s [%(overloadIndex)s]\n" % { "methodName": colored(payload['methodName'], "green", attrs=["bold"]), "caller": colored(payload['caller'].split("class ")[1], "blue", attrs=["bold"]), "className": colored(payload['className'], "magenta", attrs=["bold"]), "overloadIndex": colored(payload['overloadIndex'], "red", attrs=["bold"]) }

def build_search_script(className, method):
    if not method or method == "" and not className or className == "":
        script = """
        Java.perform(function (){
            var classes = Java.enumerateLoadedClassesSync();
            classes = classes.sort();
            for(var i=0; i < classes.length; i++ ) {
                var payload = {
                    "type": "classEnum",
                    "className": classes[i].replace(/\//gi, '.').replace(/\[/gi, '').replace(/^L/, '').replace(/;$/, '')
                };
                send(JSON.stringify(payload));
            }
        });
        """
    else:
        script = """
        Java.perform(function() {
            function wildcard_search(string, search) {
                var prevIndex = -1,
                array = search.split('*'),
                result = true;
                for (var i = 0; i < array.length && result; i++) {
                    var index = string.indexOf(array[i]);
                    if (index == -1 || index < prevIndex) {
                        return false;
                    }
                }
                return result;
            }
            Java.enumerateLoadedClasses({
                onMatch: function(name) {
                    name = name.replace(/\//gi, '.').replace(/\[/gi, '').replace(/^L/, '').replace(/;$/, '');
                    if (wildcard_search(name, "%(className)s")) {
                        try {
                            var handle = Java.use(name);
                            if (handle.%(methodName)s) {
                                var overload_count = handle.%(methodName)s.overloads.length;
                                var payload = {
                                    "type": "classEnum",
                                    "className": name,
                                    "overloads": overload_count
                                };
                                send(JSON.stringify(payload));
                            }
                        } catch (e) {}
                    }
                },
                onComplete: function() {}
            });
        });
        """ % { "className": className, "methodName": method }
    return script

def begin_instrumentation(appName, script_source):
    device = frida.get_usb_device()
    try:
        session = device.attach(appName)
    except Exception as e:
        print colored('[ERROR]: ' + str(e), "red")
        sys.exit()
    try:
        script = session.create_script(script_source)
        script.on('message', on_message)
        script.load()
    except Exception as e:
        print colored('[ERROR]: ' + str(e), "red")
        sys.exit()

def enumerate_overloads(overload_count, methodName):
    generated_overloads = []
    template ="""c.%(methodName)s.overloads[i].implementation = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
    var methodName = c.%(methodName)s.overloads[i].toString().split("function")[1].split("{")[0].trim().split("(")[0];
    var argTypes = getType(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
    var args = "";
    for (var i = 0; i < argTypes.length; i++) {
      if (i != argTypes.length - 1) {
        args += argTypes[i] + " arg" + i + ", ";
      } else {
        args += argTypes[i] + " arg" + i;
      }
    }
    var methodName = methodName + "(" + args + ")";
    var payload = {
        "type": "methodTrace",
        "methodName": methodName,
        "className": className,
        "overloadIndex": ovrldindexplaceholder,
        "caller": this.getClass().toString()
    };
    send(JSON.stringify(payload));
    return this.%(methodName)s.overloads[i].apply(this, arguments);
  };""" % { "methodName": methodName }
    for index in range(0, overload_count):
        argString = ""
        current_template = ""
        current_overload = ""
        current_template = template
        current_template = current_template.replace("overloads[i]", "overloads[" + str(index) +"]")
        current_template = current_template.replace("ovrldindexplaceholder", str(index))
        generated_overloads.append(current_template)
    return generated_overloads

def build_trace_script(candidates, methodName):
    generated_trace_scripts = []
    for candidate in candidates:
        for overload_variant in enumerate_overloads(candidate[1], methodName):
            if overload_variant == "":
                continue
            tracer_template = """'use strict';
            var checkType = function(arg) {
  var type = "";
  if (arg.getClass) {
    type = arg.getClass().toString().split("class ")[1];
  } else if (typeof arg === "string") {
    type = "String";
  } else if (typeof arg === "number") {
    type = "Number";
  } else if (typeof arg === "boolean") {
    type = "Boolean";
  } else if (arg.length) {
    type = "Array";
  } else if (typeof arg === "object") {
    type = "Object";
  } else {
    type = typeof arg;
  }
  return type;
}
var getType = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
  var type = [];
  if (a1) {
  type.push(checkType(a1));
  }
if (a2) {
  type.push(checkType(a2));
}
if (a3) {
  type.push(checkType(a3));
}
if (a4) {
  type.push(checkType(a4));
}
if (a5) {
  type.push(checkType(a5));
}
if (a6) {
  type.push(checkType(a6));
}
if (a7) {
  type.push(checkType(a7));
}
if (a8) {
  type.push(checkType(a8));
}
if (a9) {
  type.push(checkType(a9));
}
if (a10) {
  type.push(checkType(a10));
}
if (a11) {
  type.push(checkType(a11));
}
if (a12) {
  type.push(checkType(a12));
}
if (a13) {
  type.push(checkType(a13));
}
if (a14) {
  type.push(checkType(a14));
}
if (a15) {
  type.push(checkType(a15));
}
  return type;
}

Java.perform(function () {
  var className = "%s";
  var c = Java.use(className);
  %s
});
""" % (candidate[0], overload_variant)
            generated_trace_scripts.append(tracer_template)
    return generated_trace_scripts

def generate_tracer_js(scriptName, txtScript):
    script_dir = "__handlers__"
    if not os.path.exists(script_dir):
        os.makedirs(script_dir)
    tracer_file_path = os.path.join(script_dir, scriptName + ".js")
    with codecs.open(tracer_file_path, 'w', 'utf-8') as f:
        f.write(txtScript)
    return tracer_file_path

if not method or method == "" and not className or className == "":
    print colored('Enumerating loaded classes...', "green", attrs=["bold"])    
else:
    print 'Searching method "%s" in loaded classes...' % colored(method, "green", attrs=["bold"])

begin_instrumentation(appName, build_search_script(className, method))

if len(classCandidates) > 0:
    tracer_script_source = ""
    for script in build_trace_script(classCandidates, method):
        tracer_script_source += script
    begin_instrumentation(appName, tracer_script_source)
    print colored("\nTracing methods...\n", "blue", attrs=["bold"])
    try:
        sys.stdin.readlines()
    except KeyboardInterrupt:
        sys.exit()
else:
    print colored('Didn\'t find anything...quitting!', "red")
    sys.exit()