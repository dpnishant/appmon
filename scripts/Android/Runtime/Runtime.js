/**
 * Copyright (c) 2016 Nishant Das Patnaik.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

'use strict';

var processArgs = function(command, envp, dir) {
  var output = {};
  if (command) {
    //console.log("Command: " + command);
    output.command = command;
  }
  if (envp) {
    //console.log("Environment: " + envp);
    output.envp = envp;
  }
  if (dir) {
    //console.log("Working Directory: " + dir);
    output.dir = dir;
  }
  return output;
}

Java.perform(function() {
    var Runtime = Java.use("java.lang.Runtime");
    if (Runtime.exec) {
      Runtime.exec.overloads[0].implementation = function(command, envp, dir) {
        //console.log(processArgs(command, envp, dir));
        var args = processArgs(command, envp, dir);
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Runtime Command Execution';
        send_data.lib = 'java.lang.Runtime';
        send_data.method = 'exec';
        send_data.trace = trace();
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Command";
        data.value = args.command ? args.command.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Environment";
        data.value = args.envp ? args.envp.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Working Directory";
        data.value = args.dir ? args.dir.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        send(JSON.stringify(send_data));
        return this.exec.overloads[0].apply(this, arguments);
      }

      Runtime.exec.overloads[1].implementation = function(command, envp, dir) {
        var args = processArgs(command, envp, dir);
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Runtime Command Execution';
        send_data.lib = 'java.lang.Runtime';
        send_data.method = 'exec';
        send_data.trace = trace();
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Command";
        data.value = args.command ? args.command.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Environment";
        data.value = args.envp ? args.envp.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Working Directory";
        data.value = args.dir ? args.dir.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
        return this.exec.overloads[1].apply(this, arguments);
      }

      Runtime.exec.overloads[2].implementation = function(command, envp, dir) {
        //console.log(processArgs(command, envp, dir));
        var args = processArgs(command, envp, dir);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Runtime Command Execution';
      send_data.lib = 'java.lang.Runtime';
      send_data.method = 'exec';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Command";
      data.value = args.command ? args.command.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Environment";
      data.value = args.envp ? args.envp.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Working Directory";
      data.value = args.dir ? args.dir.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.exec.overloads[2].apply(this, arguments);
    }

    Runtime.exec.overloads[3].implementation = function(command, envp, dir) {
      //console.log(processArgs(command, envp, dir));
      var args = processArgs(command, envp, dir);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Command Execution';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'exec';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Command";
    data.value = args.command ? args.command.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Environment";
    data.value = args.envp ? args.envp.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Working Directory";
    data.value = args.dir ? args.dir.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));

    return this.exec.overloads[3].apply(this, arguments);
  }

  Runtime.exec.overloads[4].implementation = function(command, envp, dir) {
    //console.log(processArgs(command, envp, dir));
    var args = processArgs(command, envp, dir);
  /*   --- Payload Header --- */
  var send_data = {};
  send_data.time = new Date();
  send_data.txnType = 'Runtime Command Execution';
  send_data.lib = 'java.lang.Runtime';
  send_data.method = 'exec';
  send_data.trace = trace();
  send_data.artifact = [];

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Command";
  data.value = args.command ? args.command.toString() : 'null';
  data.argSeq = 0;
  send_data.artifact.push(data);

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Environment";
  data.value = args.envp ? args.envp.toString() : 'null';
  data.argSeq = 0;
  send_data.artifact.push(data);

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Working Directory";
  data.value = args.dir ? args.dir.toString() : 'null';
  data.argSeq = 0;
  send_data.artifact.push(data);
  send(JSON.stringify(send_data));
  return this.exec.overloads[4].apply(this, arguments);
}

Runtime.exec.overloads[5].implementation = function(command, envp, dir) {
  //console.log(processArgs(command, envp, dir));
  var args = processArgs(command, envp, dir);
/*   --- Payload Header --- */
var send_data = {};
send_data.time = new Date();
send_data.txnType = 'Runtime Command Execution';
send_data.lib = 'java.lang.Runtime';
send_data.method = 'exec';
send_data.trace = trace();
send_data.artifact = [];

/*   --- Payload Body --- */
var data = {};
data.name = "Command";
data.value = args.command ? args.command.toString() : 'null';
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Environment";
data.value = args.envp ? args.envp.toString() : 'null';
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Working Directory";
data.value = args.dir ? args.dir.toString() : 'null';
data.argSeq = 0;
send_data.artifact.push(data);
send(JSON.stringify(send_data));
return this.exec.overloads[5].apply(this, arguments);
}
}

if (Runtime.loadLibrary) {
  Runtime.loadLibrary.overloads[0].implementation = function(libname) {
    //console.log("Runtime.loadLibrary: " + libname);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'loadLibrary';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = libname ? libname.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.loadLibrary.overloads[0].apply(this, arguments);
  }

    Runtime.loadLibrary.overloads[1].implementation = function(libname) {
    //console.log("Runtime.loadLibrary: " + libname);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'loadLibrary';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = libname ? libname.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.loadLibrary.overloads[1].apply(this, arguments);
  }
}

if (Runtime.load) {
  Runtime.load.overloads[0].implementation = function(filename) {
    //console.log("Runtime.load: " + filename);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'load';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = filename ? filename.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.load.overloads[0].apply(this, arguments);
  }

  Runtime.load.overloads[1].implementation = function(filename) {
    //console.log("Runtime.load: " + filename);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'load';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = filename ? filename.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.load.overloads[1].apply(this, arguments);
  }
}
});