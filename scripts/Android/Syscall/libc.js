'use strict';

var fchmod_fd = '';
var fchmod_mode = '';
var chmod_pathname = '';
var chmod_mode = '';

var chown_pathname = '';
var chown_owner = '';
var chown_group = '';


var hexify = function (hexdump_output) {
  var hexified = " ";
  var raw_array = hexdump_output.split("\n");
  for (var a = 0; a < raw_array.length; a++) {
    var line_array = raw_array[a].split(" ");
    for (var b = 1; b < line_array.length - 1; b++) {
      if(line_array[b].length === 2){
        hexified += line_array[b];
        hexified = hexified.trim()
      }
    }
  };
  return hexified;
};

// Man Page: http://man7.org/linux/man-pages/man2/chmod.2.html

Interceptor.attach(Module.findExportByName('libc.so', 'chmod'), {
  onEnter: function(args) {
    chmod_pathname = Memory.readUtf8String(args[0]);
    chmod_mode = args[1].toInt32();
  },
  
  onLeave: function(retval) {
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'syscall';
    send_data.lib = 'libc.so';
    send_data.method = 'chmod';
    send_data.artifact = [];
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Pathname";
    data.value = chmod_pathname;
    data.argSeq = 1;
    send_data.artifact.push(data);
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Mode";
    data.value = chmod_mode;
    data.argSeq = 2;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Status";
    var ret = retval.toInt32() === 0 ? "Success" : retval.toInt32() === -1 ? "Error" : "Unknown (" + retval.toInt32() + ")";
    data.value = ret;
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
  }
});

// Man Page: http://man7.org/linux/man-pages/man2/fchmod.2.html

Interceptor.attach(Module.findExportByName('libc.so', 'fchmod'), {
  onEnter: function(args) {
    fd = args[0].toInt32();
    mode = args[1].toInt32();
  },
  
  onLeave: function(retval) {
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'syscall';
    send_data.lib = 'libc.so';
    send_data.method = 'fchmod';
    send_data.artifact = [];
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "File Descriptor";
    data.value = fchmod_fd;
    data.argSeq = 1;
    send_data.artifact.push(data);
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Mode";
    data.value = fchmode_mode;
    data.argSeq = 2;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Status";
    var ret = retval.toInt32() === 0 ? "Success" : retval.toInt32() === -1 ? "Error" : "Unknown (" + retval.toInt32() + ")";
    data.value = ret;
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
  }
});

// Man page: http://man7.org/linux/man-pages/man2/chown.2.html

Interceptor.attach(Module.findExportByName('libc.so', 'chown'), {
  onEnter: function(args) {
    chown_pathname = Memory.readUtf8String(args[0]);
    chown_owner = args[1].toInt32();
    chown_group = args[2].toInt32();
  },
  
  onLeave: function(retval) {
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'syscall';
    send_data.lib = 'libc.so';
    send_data.method = 'chown';
    send_data.artifact = [];
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Pathname";
    data.value = chown_pathname;
    data.argSeq = 1;
    send_data.artifact.push(data);
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Owner";
    data.value = chown_owner;
    data.argSeq = 2;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Group";
    data.value = chown_group;
    data.argSeq = 2;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Status";
    var ret = retval.toInt32() === 0 ? "Success" : retval.toInt32() === -1 ? "Error" : "Unknown (" + retval.toInt32() + ")";
    data.value = ret;
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
  }
});
