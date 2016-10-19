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
var resolver = new ApiResolver('objc');
var NSXMLParser_initWithData = {};

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

resolver.enumerateMatches('-[NSXMLParser initWithData:]', {
  onMatch: function(match) {
    if (match.name.indexOf('-[NSXMLParser initWithData:]') > -1) {
      NSXMLParser_initWithData.name = match.name;
      NSXMLParser_initWithData.address = match.address;
    }
  },
  onComplete: function() {}
});
if (NSXMLParser_initWithData.address) {
  Interceptor.attach(NSXMLParser_initWithData.address, {
    onEnter: function(args) {
        var data = new ObjC.Object(args[2]);
        var buff = Memory.readByteArray(data.bytes(), data.length());
        var dump_raw = hexify(hexdump(buff, {
          offset: 0,
          length: data.length(),
          header: true,
          ansi: false
        }));
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'XML';
        send_data.lib = 'libobjc.a.dylib';
        send_data.method = '-[NSXMLParser initWithData:]';
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "XML Read";
        data.value = dump_raw
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
}