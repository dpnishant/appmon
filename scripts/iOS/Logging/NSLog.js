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

var NSLog = Module.findExportByName('Foundation', 'NSLog');
var NSLogv = Module.findExportByName('Foundation', 'NSLogv');

Interceptor.attach(NSLog, {
  onEnter: function(args) {
    var logMessage = new ObjC.Object(args[0]);
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Logging';
    send_data.lib = 'Foundation';
    send_data.method = 'NSLog';
    send_data.artifact = [];
    var data = {};
    data.name = "Log Message";
    data.value = logMessage.toString();
    data.argSeq = 0;
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

Interceptor.attach(NSLogv, {
  onEnter: function(args) {
    var logMessage = new ObjC.Object(args[0]);
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Logging';
    send_data.lib = 'Foundation';
    send_data.method = 'NSLogv';
    send_data.artifact = [];
    var data = {};
    data.name = "Log Message";
    data.value = logMessage.toString();
    data.argSeq = 0;
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