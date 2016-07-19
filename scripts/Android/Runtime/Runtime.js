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
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Command";
        data.value = args.command;
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Environment";
        data.value = args.envp;
        data.argSeq = 0;
        send_data.artifact.push(data);

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Working Directory";
        data.value = args.dir;
        data.argSeq = 0;
        send_data.artifact.push(data);

        send(JSON.stringify(send_data));
        return this.exec.overloads[0].apply(this, arguments);
      }

      Runtime.exec.overloads[1].implementation = function(command, envp, dir) {
        var args = processArgs(command, envp, dir));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Runtime Command Execution';
      send_data.lib = 'java.lang.Runtime';
      send_data.method = 'exec';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Command";
      data.value = args.command;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Environment";
      data.value = args.envp;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Working Directory";
      data.value = args.dir;
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.exec.overloads[1].apply(this, arguments);
    }

    Runtime.exec.overloads[2].implementation = function(command, envp, dir) {
      //console.log(processArgs(command, envp, dir));
      var args = processArgs(command, envp, dir));
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Command Execution';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'exec';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Command";
    data.value = args.command;
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Environment";
    data.value = args.envp;
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Working Directory";
    data.value = args.dir;
    data.argSeq = 0;
    send_data.artifact.push(data);
    send(JSON.stringify(send_data));
    return this.exec.overloads[2].apply(this, arguments);
  }

  Runtime.exec.overloads[3].implementation = function(command, envp, dir) {
    //console.log(processArgs(command, envp, dir));
    var args = processArgs(command, envp, dir));
  /*   --- Payload Header --- */
  var send_data = {};
  send_data.time = new Date();
  send_data.txnType = 'Runtime Command Execution';
  send_data.lib = 'java.lang.Runtime';
  send_data.method = 'exec';
  send_data.artifact = [];

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Command";
  data.value = args.command;
  data.argSeq = 0;
  send_data.artifact.push(data);

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Environment";
  data.value = args.envp;
  data.argSeq = 0;
  send_data.artifact.push(data);

  /*   --- Payload Body --- */
  var data = {};
  data.name = "Working Directory";
  data.value = args.dir;
  data.argSeq = 0;
  send_data.artifact.push(data);

  send(JSON.stringify(send_data));

  return this.exec.overloads[3].apply(this, arguments);
}

Runtime.exec.overloads[4].implementation = function(command, envp, dir) {
  //console.log(processArgs(command, envp, dir));
  var args = processArgs(command, envp, dir));
/*   --- Payload Header --- */
var send_data = {};
send_data.time = new Date();
send_data.txnType = 'Runtime Command Execution';
send_data.lib = 'java.lang.Runtime';
send_data.method = 'exec';
send_data.artifact = [];

/*   --- Payload Body --- */
var data = {};
data.name = "Command";
data.value = args.command;
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Environment";
data.value = args.envp;
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Working Directory";
data.value = args.dir;
data.argSeq = 0;
send_data.artifact.push(data);
send(JSON.stringify(send_data));
return this.exec.overloads[4].apply(this, arguments);
}

Runtime.exec.overloads[5].implementation = function(command, envp, dir) {
  //console.log(processArgs(command, envp, dir));
  var args = processArgs(command, envp, dir));
/*   --- Payload Header --- */
var send_data = {};
send_data.time = new Date();
send_data.txnType = 'Runtime Command Execution';
send_data.lib = 'java.lang.Runtime';
send_data.method = 'exec';
send_data.artifact = [];

/*   --- Payload Body --- */
var data = {};
data.name = "Command";
data.value = args.command;
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Environment";
data.value = args.envp;
data.argSeq = 0;
send_data.artifact.push(data);

/*   --- Payload Body --- */
var data = {};
data.name = "Working Directory";
data.value = args.dir;
data.argSeq = 0;
send_data.artifact.push(data);
send(JSON.stringify(send_data));
return this.exec.overloads[5].apply(this, arguments);
}
}

if (Runtime.loadLibrary) {
  Runtime.loadLibrary.implementation = function(libname) {
    //console.log("Runtime.loadLibrary: " + libname);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'loadLibrary';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = args.command;
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.loadLibrary.call(this, libname);
  }
}

if (Runtime.load) {
  Runtime.load.implementation = function(filename) {
    //console.log("Runtime.load: " + filename);
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Runtime Load Library';
    send_data.lib = 'java.lang.Runtime';
    send_data.method = 'load';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Library Path";
    data.value = args.command;
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.load.call(this, filename);
  }
}
});