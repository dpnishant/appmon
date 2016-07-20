'use strict';

Java.perform(function() {
      var ContextWrapper = Java.use("android.content.ContextWrapper");

      if (ContextWrapper.getCacheDir) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#getCacheDir()
        ContextWrapper.getCacheDir.implementation = function() {
          var cache_dir = this.getCacheDir.call(this);
          console.log('Cache Dir: ' + cache_dir.toString());
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'Storage';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'getCacheDir';
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "Cache Directory";
          data.value = cache_dir.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          return cache_dir;
        };
      }

      if (ContextWrapper.getDataDir) { //Not available below API Level 24
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#getDataDir()
        ContextWrapper.getDataDir.implementation = function() {
          var data_dir = this.getDataDir.call(this);
          console.log('Cache Dir: ' + data_dir.toString());
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'Storage';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'getDataDir';
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "Data Directory";
          data.value = cache_dir.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          return data_dir;
        };
      }
    });