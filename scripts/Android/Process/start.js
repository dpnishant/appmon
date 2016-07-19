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
      data.value = processClass;
      data.argSeq = 0;
      send_data.artifact.push(data);
      
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Nice Name";
      data.value = niceName;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "uid";
      data.value = uid;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "gid";
      data.value = gid;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "gids";
      data.value = gids;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Debug Flags";
      data.value = debugFlags;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Mount External";
      data.value = mountExternal;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Target Sdk Version";
      data.value = targetSdkVersion;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SElinux Info";
      data.value = seInfo;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "abi";
      data.value = abi;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Instruction Set";
      data.value = instructionSet;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Application Data Directory";
      data.value = appDataDir;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Zygote Args";
      data.value = zygoteArgs;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));

      return this.start.apply(this, arguments);
    }
  }
});