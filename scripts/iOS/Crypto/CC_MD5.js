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

var md5_data;
var md5_digest;

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

Interceptor.attach(Module.findExportByName('libcommonCrypto.dylib', 'CC_MD5'), {
  onEnter: function(args) {
    var data = hexify(hexdump(args[0], {
      length: args[1].toInt32()
    }));
    md5_data = data;
  },
  
  onLeave: function(retval) {
    var MD5 = hexify(hexdump(retval, {
      length: 16
    }));
    md5_digest = MD5;

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'MD5 Hash';
    send_data.lib = 'libcommonCrypto.dylib';
    send_data.method = 'CC_MD5';
    send_data.artifact = [];
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "MD5 Data";
    data.value = md5_data;
    data.argSeq = 2;
    send_data.artifact.push(data);
    
    /*   --- Payload Body --- */
    var data = {};
    data.name = "MD5 Digest";
    data.value = md5_digest;
    data.argSeq = 3;
    send_data.artifact.push(data);
    
    send(JSON.stringify(send_data));
  }
});