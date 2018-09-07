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
Java.perform(function(argument) {
  var Context = Java.use("android.content.Context");
  var ClipboardManager = Java.use("android.content.ClipboardManager");
  ClipboardManager.setPrimaryClip.implementation = function(clip) {
    //console.log('Count: ' + clip.getItemCount());
    for (var i = 0; i < clip.getItemCount(); i++) {
      if (clip.getItemAt(i).getIntent()) {
        //console.log('getIntent: ' + clip.getItemAt(i).getIntent());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Clipboard';
        send_data.lib = 'android.content.ClipboardManager';
        send_data.method = 'setPrimaryClip';
        send_data.trace = trace();
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Intent";
        data.value = clip.getItemAt(i).getIntent().toString();
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      } else if (clip.getItemAt(i).getHtmlText()) {
        //console.log('getHtmlText: ' + clip.getItemAt(i).getHtmlText());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Clipboard';
        send_data.lib = 'android.content.ClipboardManager';
        send_data.method = 'setPrimaryClip';
        send_data.trace = trace();
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "HTML Text";
        data.value = clip.getItemAt(i).getHtmlText().toString();
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      } else if (clip.getItemAt(i).getUri()) {
        //console.log('getUri: ' + clip.getItemAt(i).getUri());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Clipboard';
        send_data.lib = 'android.content.ClipboardManager';
        send_data.method = 'setPrimaryClip';
        send_data.trace = trace();
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "URI";
        data.value = clip.getItemAt(i).getUri().toString();
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      } else if (clip.getItemAt(i).getText()) {
        //console.log('getText: ' + clip.getItemAt(i).getText());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Clipboard';
        send_data.lib = 'android.content.ClipboardManager';
        send_data.method = 'setPrimaryClip';
        send_data.trace = trace();
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Text";
        data.value = clip.getItemAt(i).getText().toString();
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      } else {
        //console.log('toString: ' + clip.getItemAt(i).toString());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'Clipboard';
        send_data.lib = 'android.content.ClipboardManager';
        send_data.method = 'setPrimaryClip';
        send_data.trace = trace();
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "String";
        data.value = clip.getItemAt(i).toString();
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      }
    }
    return this.setPrimaryClip.apply(this, arguments);
  }
});