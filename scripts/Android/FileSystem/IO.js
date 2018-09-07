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
      var ContextWrapper = Java.use("android.content.ContextWrapper");
      var FileNotFoundException = Java.use("java.io.FileNotFoundException");
      if (ContextWrapper.openFileInput) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openFileInput(java.lang.String)
        ContextWrapper.openFileInput.overload("java.lang.String").implementation = function(fileName) {
          
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'openFileInput';
          send_data.trace = trace();
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "File";
          data.value = fileName.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          try {
            return this.openFileInput.overload("java.lang.String").apply(this, arguments);
          } catch (e) {
            return FileNotFoundException.$new(fileName);
          }
        };
      }

      if (ContextWrapper.openFileOutput) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openFileOutput(java.lang.String, int)
        ContextWrapper.openFileOutput.overload("java.lang.String", "int").implementation = function(fileName, mode) {
          
          

          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'openFileOutput';
          send_data.trace = trace();
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
          return this.openFileOutput.overload("java.lang.String", "int").apply(this, arguments);
        };
      }

      if (ContextWrapper.deleteFile) {
        // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#deleteFile(java.lang.String)
        ContextWrapper.deleteFile.overload("java.lang.String").implementation = function(fileName) {
          
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'File I/O';
          send_data.lib = 'android.content.ContextWrapper';
          send_data.method = 'deleteFile';
          send_data.trace = trace();
          send_data.artifact = [];

          /*   --- Payload Body --- */
          var data = {};
          data.name = "File";
          data.value = fileName.toString();
          data.argSeq = 0;
          send_data.artifact.push(data);

          send(JSON.stringify(send_data));
          return this.deleteFile.overload("java.lang.String").apply(this, arguments);
        };
      }
    });

    /*
     To-do: Hook constructors for File class
    */