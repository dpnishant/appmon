Java.perform(function() {
  var ContextWrapper = Java.use("android.content.ContextWrapper");

  if (ContextWrapper.sendBroadcast) {
    // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#sendBroadcast(android.content.Intent)
    ContextWrapper.sendBroadcast.overload("android.content.Intent").implementation = function(intent) {
      //console.log("Intent toString: " + intent.toString());
      //console.log("Intent getExtras: " + intent.getExtras());
      //console.log("Intent getFlags: " + intent.getFlags());

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Broadcast Sent';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'sendBroadcast';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent (Stringified)";
      data.value = intent.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Extras";
      data.value = intent.getExtras();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Flags";
      data.value = intent.getFlags();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.sendBroadcast.overload("android.content.Intent").call(this, intent);
    };

    // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#sendBroadcast(android.content.Intent, java.lang.String)
    ContextWrapper.sendBroadcast.overload("android.content.Intent", "java.lang.String").implementation = function(intent, receiverPermission) {
      //console.log("Intent toString: " + intent.toString());
      //console.log("Intent getExtras: " + intent.getExtras());
      //console.log("Intent getFlags: " + intent.getFlags());
      //console.log("Intent receiverPermission: " + receiverPermission);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Broadcast Sent';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'sendBroadcast';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent (Stringified)";
      data.value = intent.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Extras";
      data.value = intent.getExtras();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Flags";
      data.value = intent.getFlags();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Receiver Permission";
      data.value = receiverPermission;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.sendBroadcast.overload("android.content.Intent", "java.lang.String").call(this, intent, receiverPermission);
    };
  }

  if (ContextWrapper.sendStickyBroadcast) {
    // Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#sendStickyBroadcast(android.content.Intent)
    ContextWrapper.sendStickyBroadcast.overload("android.content.Intent").implementation = function(intent) {
      //console.log("Intent toString: " + intent.toString());
      //console.log("Intent getExtras: " + intent.getExtras());
      //console.log("Intent getFlags: " + intent.getFlags());

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Sticky Broadcast Sent';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'sendStickyBroadcast';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent (Stringified)";
      data.value = intent.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Extras";
      data.value = intent.getExtras();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent Flags";
      data.value = intent.getFlags();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.sendStickyBroadcast.overload("android.content.Intent").call(this, intent);
    };
  }

  if (ContextWrapper.startActivity) {
    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#startActivity(android.content.Intent)
    ContextWrapper.startActivity.overload("android.content.Intent").implementation = function(intent) {
      //console.log("Intent: " + intent);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Activity Started';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'startActivity';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent (Stringified)";
      data.value = intent.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.startActivity.overload("android.content.Intent").apply(this, arguments);
    };

    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#startActivity(android.content.Intent, android.os.Bundle)
    ContextWrapper.startActivity.overload("android.content.Intent", "android.os.Bundle").implementation = function(intent, bundle) {
      //console.log("Intent: " + intent);
      //console.log("Bundle: " + bundle);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Activity Started';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'startActivity';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Intent (Stringified)";
      data.value = intent.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Bundle";
      data.value = bundle;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.startActivity.overload("android.content.Intent", "android.os.Bundle").apply(this, arguments);
    };
  }

  if (ContextWrapper.startService) {
    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#startService(android.content.Intent)
    ContextWrapper.startService.implementation = function(service) {
      //console.log("startService: " + service);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Service Started';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'startService';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Service";
      data.value = service;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.startService.call(this, service);
    };
  }

  if (ContextWrapper.stopService) {
    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#stopService(android.content.Intent)
    ContextWrapper.stopService.implementation = function(name) {
      //console.log("stopService: " + name);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Service Stopped';
      send_data.lib = 'android.content.ContextWrapper';
      send_data.method = 'stopService';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Service";
      data.value = service;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.stopService.call(this, name);
    };
  }

  if (ContextWrapper.registerReceiver) {
    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#registerReceiver(android.content.BroadcastReceiver, android.content.IntentFilter)
    ContextWrapper.registerReceiver.overload("android.content.BroadcastReceiver", "android.content.IntentFilter").implementation = function(receiver, filter) {
      return this.registerReceiver.apply(this, arguments);
    };

    //Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#registerReceiver(android.content.BroadcastReceiver, android.content.IntentFilter, java.lang.String, android.os.Handler)
    ContextWrapper.registerReceiver.overload("android.content.BroadcastReceiver", "android.content.IntentFilter", "java.lang.String", "android.os.Handler").implementation = function(receiver, filter, broadcastPermission, scheduler) {
      return this.registerReceiver.apply(this, arguments);
    };
  }
});