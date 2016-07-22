'use strict';

Java.perform(function() {
      var ContextWrapper = Java.use("android.content.ContextWrapper");
      var FileNotFoundException = Java.use("java.io.FileNotFoundException");
      if (ContextWrapper.openFileInput) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openFileInput(java.lang.String)
        ContextWrapper.openFileInput.overload("java.lang.String").implementation = function(fileName) {
          console.log('openFileInput Name: ' + fileName.toString());
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'openFileInput';
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "File";
          data.value = fileName.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          try {
            return this.openFileInput.overload("java.lang.String").call(this, fileName);
          } catch (e) {
            return FileNotFoundException.$new(fileName);
          }
        };
      }

      if (ContextWrapper.openFileOutput) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openFileOutput(java.lang.String, int)
        ContextWrapper.openFileOutput.overload("java.lang.String", "int").implementation = function(fileName, mode) {
          console.log('openFileOutput Name: ' + fileName.toString());
          console.log('openFileOutput Mode: ' + mode);

          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'openFileOutput';
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "File";
          data.value = fileName.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          /*   --- Payload Body --- */
          var data = {};
          data.name = "Output Mode";
          data.value = mode.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          return this.openFileOutput.overload("java.lang.String", "int").call(this, fileName, mode);
        };
      }

      if (ContextWrapper.deleteFile) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#deleteFile(java.lang.String)
        ContextWrapper.deleteFile.overload("java.lang.String").implementation = function(fileName) {
          console.log('Delete File: ' + fileName);
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'deleteFile';
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "File";
          data.value = fileName.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          return this.deleteFile.overload("java.lang.String").call(this, fileName);
        };
      }
    });

    /*
     To-do: Hook constructors for File class
    */