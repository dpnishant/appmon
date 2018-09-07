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

Java.perform(function() {
  var Process = Java.use("android.os.Process");
  if (Process.killProcess) {
    Process.start.killProcess = function(pid) {

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Process';
      send_data.lib = 'android.os.Process';
      send_data.method = 'killProcess';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "pid";
      data.value = pid.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      
      send(JSON.stringify(send_data));

      return this.killProcess.apply(this, arguments);
    }
  }
});