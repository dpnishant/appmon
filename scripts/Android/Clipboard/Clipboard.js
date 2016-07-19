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
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Intent";
        data.value = clip.getItemAt(i).getIntent();
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
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "HTML Text";
        data.value = clip.getItemAt(i).getHtmlText();
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
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "URI";
        data.value = clip.getItemAt(i).getUri();
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
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Text";
        data.value = clip.getItemAt(i).getText();
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
    return this.setPrimaryClip.call(this, clip);
  }
});