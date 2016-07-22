'use strict';

Java.perform(function() {
  var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl");
  var SharedPreferencesImpl_EditorImpl = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
  
  SharedPreferencesImpl.contains.implementation = function(key) {
    //console.log('contains KEY: ' + key);
    var value = this.contains.apply(this, arguments);
    //console.log('contains VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'contains';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getInt.implementation = function(key, defValue) {
    //console.log('getInt KEY: ' + key);
    var value = this.getInt.apply(this, arguments);
    //console.log('getInt VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getInt';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getFloat.implementation = function(key, defValue) {
    //console.log('getFloat KEY: ' + key);
    var value = this.getFloat.apply(this, arguments);
    //console.log('getFloat VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getFloat';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getLong.implementation = function(key, defValue) {
    //console.log('getLong KEY: ' + key);
    var value = this.getLong.apply(this, arguments);
    //console.log('getLong VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getLong';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getBoolean.implementation = function(key, defValue) {
    //console.log('getBoolean KEY: ' + key);
    var value = this.getBoolean.apply(this, arguments);
    //console.log('getBoolean VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getBoolean';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getString.implementation = function(key, defValue) {
    //console.log('getString Key: ' + key);
    var value = this.getString.apply(this, arguments);
    //console.log('getString Value: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getString';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getStringSet.implementation = function(key, defValue) {
    //console.log('getStringSet KEY: ' + key);
    var value = this.getStringSet.apply(this, arguments);
    //console.log('getStringSet VALUE: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getStringSet';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl_EditorImpl.putString.implementation = function(key, value) {
    //console.log('putString Key: ' + key.toString());
    //console.log('putString Value: ' + value.toString());
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'putString';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putString.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putStringSet.implementation = function(key, values) {
    //console.log('putStringSet Key: ' + key.toString());
    //console.log('putStringSet Values: ' + values.toString());
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putStringSet';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putStringSet.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putInt.implementation = function(key, value) {
    //console.log('putInt Key: ' + key.toString());
    //console.log('putInt Value: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putInt';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putInt.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putFloat.implementation = function(key, value) {
    //console.log('putFloat Key: ' + key.toString());
    //console.log('putFloat Value: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putFloat';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putFloat.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putBoolean.implementation = function(key, value) {
    //console.log('putBoolean Key: ' + key.toString());
    //console.log('putBoolean Value: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putBoolean';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putBoolean.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putLong.implementation = function(key, value) {
    //console.log('putLong Key: ' + key.toString());
    //console.log('putLong Value: ' + value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putLong';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putLong.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.remove.implementation = function(key) {
    //console.log('remove Key: ' + key.toString());
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'remove';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.remove.apply(this, arguments);
  };
});