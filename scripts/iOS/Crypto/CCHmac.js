'use strict';

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

Interceptor.attach(Module.findExportByName('libcommonCrypto.dylib', 'CCHmac'), {
  onEnter: function(args) {
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'HMAC';
      send_data.lib = 'libcommonCrypto.dylib';
      send_data.method = 'CCHmac';
      send_data.artifact = [];
      
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Key";
      var keyLength = args[2].toInt32();
      var raw_key = hexify(hexdump(args[1], {
        length: keyLength
      }));
      data.value = raw_key;
      data.argSeq = 2;
      send_data.artifact.push(data);
      
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Data";
      var dataLength = args[4].toInt32();
      var raw_data = hexify(hexdump(args[3], {
        length: dataLength
      }));
      data.value = raw_data;
      data.argSeq = 4;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
    }
    /** Omitting onLeave due to performance overhead **/
    /**
    ,onLeave: function (retval) {
      //console.log('Return Value: ' + Memory.readUtf8String(retval));
    }
    **/
});