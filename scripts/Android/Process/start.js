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
  if (Process.start) {
    Process.start.implementation = function(processClass, niceName, uid,
      gid, gids, debugFlags, mountExternal, targetSdkVersion, seInfo,
      abi, instructionSet, appDataDir, zygoteArgs) {

      //console.log("processClass: " + processClass);
      //console.log("niceName: " + niceName);
      //console.log("uid: " + uid);
      //console.log("gid: " + gid);
      //console.log("gids: " + gids);
      //console.log("debugFlags: " + debugFlags);
      //console.log("mountExternal: " + mountExternal);
      //console.log("targetSdkVersion: " + targetSdkVersion);
      //console.log("seInfo: " + seInfo);
      //console.log("abi: " + abi);
      //console.log("instructionSet: " + instructionSet);
      //console.log("appDataDir: " + appDataDir);
      //console.log("zygoteArgs: " + zygoteArgs);


      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Process';
      send_data.lib = 'android.os.Process';
      send_data.method = 'start';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Process Class";
      data.value = processClass.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Nice Name";
      data.value = niceName.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "uid";
      data.value = uid.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "gid";
      data.value = gid.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "gids";
      data.value = gids.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Debug Flags";
      data.value = debugFlags.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Mount External";
      data.value = mountExternal.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Target Sdk Version";
      data.value = targetSdkVersion.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SElinux Info";
      data.value = seInfo.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "abi";
      data.value = abi.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Instruction Set";
      data.value = instructionSet.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Application Data Directory";
      data.value = appDataDir.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Zygote Args";
      data.value = zygoteArgs.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));

      return this.start.apply(this, arguments);
    }
  }
});