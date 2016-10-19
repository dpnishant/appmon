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
var NSJSONSerialization_JSONObjectWithData_options_error = {};
var NSJSONSerialization_blacklist = [
  'UIKit', 'libobjc.A.dylib',
  'WebKitLegacy', 'libdispatch.dylib',
  'CoreFoundation', 'Foundation',
  'libsystem_pthread.dylib', 'UIFoundation'
];
var array_search = function(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) return true;
  }
  return false;
}
resolver.enumerateMatches('+[NSJSONSerialization JSONObjectWithData:options:error:]', {
  onMatch: function(match) {
    NSJSONSerialization_JSONObjectWithData_options_error.name = match.name;
    NSJSONSerialization_JSONObjectWithData_options_error.address = match.address;
  },
  onComplete: function() {}
});
if (NSJSONSerialization_JSONObjectWithData_options_error.address) {
  Interceptor.attach(NSJSONSerialization_JSONObjectWithData_options_error.address, {
    onEnter: function(args) {
        var backtrace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
        if (!array_search(backtrace[0].toString().split(' ')[1].toString().split('!')[0].toString(), NSJSONSerialization_blacklist)) {
          var str_json = '';
          var json_NSData = new ObjC.Object(args[2]);
          var str_json = Memory.readUtf8String(json_NSData.bytes(), json_NSData.length());
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'JSON Serialization';
          send_data.lib = 'libobjc.a.dylib';
          send_data.method = '+[NSJSONSerialization JSONObjectWithData:options:error:]';
          send_data.artifact = [];
          /*   --- Payload Body --- */
          var data = {}
          data.name = "JSON Data";
          data.value = str_json;
          data.argSeq = 3;
          send_data.artifact.push(data);
          send(JSON.stringify(send_data));
        }
      }
      /** Omitting onLeave due to performance overhead **/
      /**
      ,onLeave: function (retval) {
        //console.log('Return Value: ' + Memory.readUtf8String(retval));
      }
      **/
  });
}