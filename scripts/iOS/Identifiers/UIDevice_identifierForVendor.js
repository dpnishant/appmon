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
var UIDevice_identifierForVendor = {};
var UIDevice_identifierForVendor_blacklist = [
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
resolver.enumerateMatches('-[UIDevice identifierForVendor]', {
  onMatch: function(match) {
    UIDevice_identifierForVendor.name = match.name;
    UIDevice_identifierForVendor.address = match.address;
  },
  onComplete: function() {}
});
if (UIDevice_identifierForVendor.address) {
  Interceptor.attach(UIDevice_identifierForVendor.address, {
    onLeave: function (retval) {
      var UUID = new ObjC.Object(retval);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Device Indentifier';
      send_data.lib = 'libobjc.a.dylib';
      send_data.method = '-[UIDevice identifierForVendor]';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {}
      data.name = "UUID";
      data.value = UUID.UUIDString().toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
    }
  });
}