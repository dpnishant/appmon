/**
 * Copyright (c) 2016 eBay Software Foundation.
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
Interceptor.attach(Module.findExportByName('Security', 'SecItemAdd'), {
  onEnter: function(args) {
      var strSecItemAddBlob = '';
      var dict = new ObjC.Object(args[0]);
      var iter = dict.keyEnumerator();
      var key;
      while ((key = iter.nextObject()) !== null) {
        var value = dict.objectForKey_(key);
        if (key.toString() === 'v_Data') {
          var parsed_value = ObjC.classes.NSKeyedUnarchiver.unarchiveObjectWithData_(value);
          strSecItemAddBlob += '\t[-] ' + key + ' => \n' + parsed_value + '\n';
        } else {
          strSecItemAddBlob += '\t' + key + ': ' + value + '\n';
        }
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'KeyChain';
      send_data.lib = 'Security';
      send_data.method = 'SecItemAdd';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Keychain-Write";
      data.value = strSecItemAddBlob
      data.argSeq = 1;
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