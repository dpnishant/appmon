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
  var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl");
  var SharedPreferencesImpl_EditorImpl = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
  
  SharedPreferencesImpl.contains.implementation = function(key) {
    var value = this.contains.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'contains';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getInt.implementation = function(key, defValue) {
    var value = this.getInt.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getInt';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getFloat.implementation = function(key, defValue) {

    var value = this.getFloat.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getFloat';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getLong.implementation = function(key, defValue) {
    var value = this.getLong.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getLong';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getBoolean.implementation = function(key, defValue) {

    var value = this.getBoolean.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getBoolean';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getString.implementation = function(key, defValue) {
    var value = this.getString.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getString';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl.getStringSet.implementation = function(key, defValue) {
    var value = this.getStringSet.apply(this, arguments);

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'getStringSet';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return value;
  };

  SharedPreferencesImpl_EditorImpl.putString.implementation = function(key, value) {

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl';
    send_data.method = 'putString';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putString.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putStringSet.implementation = function(key, values) {
    
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putStringSet';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putStringSet.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putInt.implementation = function(key, value) {
    
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putInt';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putInt.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putFloat.implementation = function(key, value) {
    
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putFloat';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putFloat.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putBoolean.implementation = function(key, value) {
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putBoolean';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putBoolean.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.putLong.implementation = function(key, value) {
    
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'putLong';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Value";
    data.value = value ? value.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.putLong.apply(this, arguments);
  };

  SharedPreferencesImpl_EditorImpl.remove.implementation = function(key) {
    
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SharedPreferences';
    send_data.lib = 'android.app.SharedPreferencesImpl$EditorImpl';
    send_data.method = 'remove';
    send_data.trace = trace();
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "Key";
    data.value = key ? key.toString() : 'null';
    data.argSeq = 0;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
    return this.remove.apply(this, arguments);
  };
});