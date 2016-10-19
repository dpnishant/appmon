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
var NSUserDefaults_standardUserDefaults = {};
var NSUserDefaults_blacklist = [
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
resolver.enumerateMatches('+[NSUserDefaults standardUserDefaults]', {
  onMatch: function(match) {
    if (match.name === '+[NSUserDefaults standardUserDefaults]') {
      NSUserDefaults_standardUserDefaults.name = match.name;
      NSUserDefaults_standardUserDefaults.address = match.address;
    }
  },
  onComplete: function() {}
});
if (NSUserDefaults_standardUserDefaults.address) {
  Interceptor.attach(NSUserDefaults_standardUserDefaults.address, {
    onLeave: function(retval) {
      var backtrace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
      if (!array_search(backtrace[0].toString().split(' ')[1].toString().split('!')[0].toString(), NSUserDefaults_blacklist)) {
        var strUserDefaultsBlob = '';
        var userdefaults = new ObjC.Object(retval);
        var userdefaults_dict = userdefaults.dictionaryRepresentation();
        var enumerator = userdefaults_dict.keyEnumerator();
        var key;
        while ((key = enumerator.nextObject()) !== null) {
          var value = userdefaults_dict.objectForKey_(key);
          var flag = false;
          if (key.toString().indexOf('WebKit') > -1 || key.toString().indexOf('Apple') === 0 || key.toString().indexOf('NS') === 0) {
            var flag = true;
          }
          if (!flag) {
            /* 4-byte grouping signature of $versionX$objectsY$archiverT$top via 4-byte grouping */
            if (value.toString().toLowerCase().indexOf("2476 65727369 6f6e5824 6f626a65 63747359 24617263 68697665 72542474 6f70") > -1) {
              var parsed_value = ObjC.classes.NSKeyedUnarchiver.unarchiveObjectWithData_(value);
              if (parsed_value.toString().indexOf('<') === 0 && parsed_value.toString().indexOf('>') === parsed_value.toString().length - 1) {
                parsed_value = new ObjC.Object(parsed_value);
                var methods = parsed_value.$ownMethods;
                parsed_value = {};
                parsed_value.methods = methods;
                parsed_value = JSON.stringify(parsed_value);
              }
              strUserDefaultsBlob += key.toString() + ': ' + parsed_value + '\n';
            } else {
              strUserDefaultsBlob += key.toString() + ': ' + value.toString() + '\n';
            }
          }
        }
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'UserDefaults';
        send_data.lib = 'libobjc.a.dylib';
        send_data.method = '+[NSUserDefaults standardUserDefaults]';
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "UserDefaults R/W";
        data.value = strUserDefaultsBlob;
        data.argSeq = 3;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      }
    }
  });
}