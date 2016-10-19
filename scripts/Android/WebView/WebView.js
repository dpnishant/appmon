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
  var WebView = Java.use("android.webkit.WebView");
  var WebSettings = Java.use("android.webkit.WebSettings");

  /*
  function checkSettings(wv) {
    if (WebView.getSettings) {
      if (WebView.$new().getSettings().getJavaScriptEnabled()) {
        //console.log("WebView getJavaScriptEnabled: True");
      } else {
        //console.log("WebView getJavaScriptEnabled: False");
      }

      if (WebView.$new().getSettings().getPluginState() === WebSettings.$new().PluginState.OFF) {
        //console.log("WebView getPluginState: OFF");
      } else {
        //console.log("WebView getPluginState: ON");
      }

      if (WebView.$new().getSettings().getAllowFileAccess()) {
        //console.log("WebView getAllowFileAccess: True");
      } else {
        //console.log("WebView getAllowFileAccess: False");
      }
    }
  }
*/
  if (WebView.loadUrl) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadUrl(java.lang.String)
    WebView.loadUrl.overloads[0].implementation = function(url) {
      //checkSettings(this);
      //console.log("WebView Navigation: " + url.toString());
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'loadUrl';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "URL";
      data.value = url.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));

      return this.loadUrl.overloads[0].apply(this, arguments);
    };

    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadUrl(java.lang.String, java.util.Map<java.lang.String, java.lang.String>)
    WebView.loadUrl.overloads[1].implementation = function(url, additionalHttpHeaders) {
      //checkSettings(this);
      //console.log("WebView Navigation: " + url.toString());
      //console.log("WebView Headers: " + additionalHttpHeaders);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'loadUrl';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "URL";
      data.value = url.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Additional Headers";
      data.value = additionalHttpHeaders.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.loadUrl.overloads[1].apply(this, arguments);
    }
  }

  if (WebView.loadData) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadData(java.lang.String, java.lang.String, java.lang.String)
    WebView.loadData.implementation = function(data, mimeType, encoding) {
      //checkSettings(this);
      //console.log("WebView loadData data: " + data);
      //console.log("WebView loadData mimeType: " + mimeType);
      //console.log("WebView loadData encoding: " + encoding);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'loadData';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Data";
      data.value = data.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "MIME Type";
      data.value = mimeType.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Encoding";
      data.value = encoding.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));

      return this.loadData.apply(this, arguments);
    }
  }

  if (WebView.loadDataWithBaseURL) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadDataWithBaseURL(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
    WebView.loadDataWithBaseURL.implementation = function(baseUrl, data, mimeType, encoding, historyUrl) {
      //checkSettings(this);
      //console.log("WebView loadDataWithBaseURL baseUrl: " + baseUrl);
      //console.log("WebView loadDataWithBaseURL data: " + data);
      //console.log("WebView loadDataWithBaseURL mimeType: " + mimeType);
      //console.log("WebView loadDataWithBaseURL encoding: " + encoding);
      //console.log("WebView loadDataWithBaseURL historyUrl: " + historyUrl);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'loadDataWithBaseURL';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Base URL";
      data.value = data.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Data";
      data.value = data.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "MIME Type";
      data.value = mimeType.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Encoding";
      data.value = encoding.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "History URL";
      data.value = historyUrl.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.loadDataWithBaseURL.apply(this, arguments);
    }
  }

  if (WebView.addJavascriptInterface) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#addJavascriptInterface(java.lang.Object, java.lang.String)
    WebView.addJavascriptInterface.implementation = function(object, name) {
      //console.log("addJavascriptInterface Object: " + object.toString());
      //console.log("addJavascriptInterface Name: " + name);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'addJavascriptInterface';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Object";
      data.value = object.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Name";
      data.value = name.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));

      return this.addJavascriptInterface.apply(this, arguments);
    }
  }

  if (WebView.evaluateJavascript) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#evaluateJavascript(java.lang.String, android.webkit.ValueCallback<java.lang.String>)
    WebView.evaluateJavascript.implementation = function(script, resultCallback) {
      //console.log("WebView evaluateJavascript Script: " + script);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'evaluateJavascript';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Script";
      data.value = script.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.evaluateJavascript.apply(this, arguments);
    }
  }

  if (WebView.postUrl) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#postUrl(java.lang.String, byte[])
    WebView.postUrl.implementation = function(url, postData) {
      //checkSettings(this);
      //console.log("WebView postUrl URL: " + url);
      //console.log("WebView postUrl postData: " + postData);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'postUrl';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "URL";
      data.value = url.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "POST Data";
      data.value = postData.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.postUrl.apply(this, arguments);
    }
  }

  if (WebView.postWebMessage) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#postWebMessage(android.webkit.WebMessage, android.net.Uri)
    WebView.postWebMessage.implementation = function(message, targetOrigin) {
      //console.log("WebView postWebMessage message: " + message.getData());
      //console.log("WebView postWebMessage targetOrigin: " + targetOrigin.toString());

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'postWebMessage';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Message";
      data.value = message.getData().toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Target Origin";
      data.value = targetOrigin.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.postWebMessage.apply(this, arguments);
    }
  }

  if (WebView.savePassword) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#savePassword(java.lang.String, java.lang.String, java.lang.String)
    WebView.savePassword.implementation = function(host, username, password) {
      //console.log("WebView savePassword Host: " + host);
      //console.log("WebView savePassword Username: " + username);
      //console.log("WebView savePassword Password: " + password);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'savePassword';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Host";
      data.value = host.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Username";
      data.value = username.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Password";
      data.value = password.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.savePassword.apply(this, arguments);
    }
  }

  if (WebView.setHttpAuthUsernamePassword) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#setHttpAuthUsernamePassword(java.lang.String, java.lang.String, java.lang.String, java.lang.String)
    WebView.setHttpAuthUsernamePassword.implementation = function(host, realm, username, password) {
      //console.log("WebView setHttpAuthUsernamePassword Host: " + host);
      //console.log("WebView setHttpAuthUsernamePassword Realm: " + realm);
      //console.log("WebView setHttpAuthUsernamePassword Username: " + username);
      //console.log("WebView setHttpAuthUsernamePassword Password: " + password);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'setHttpAuthUsernamePassword';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Host";
      data.value = host.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Realm";
      data.value = realm.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Username";
      data.value = username.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Password";
      data.value = password.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.setHttpAuthUsernamePassword.apply(this, arguments);
    }
  }

  if (WebView.getHttpAuthUsernamePassword) {
    //Ref: https://developer.android.com/reference/android/webkit/WebView.html#getHttpAuthUsernamePassword(java.lang.String, java.lang.String)
    WebView.getHttpAuthUsernamePassword.implementation = function(host, realm) {
      var credentials = this.getHttpAuthUsernamePassword.apply(this, arguments);
      //console.log("WebView getHttpAuthUsernamePassword Host: " + host);
      //console.log("WebView getHttpAuthUsernamePassword Host: " + realm);
      //console.log("WebView getHttpAuthUsernamePassword Credentials: " + credentials);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'WebView';
      send_data.lib = 'android.webkit.WebView';
      send_data.method = 'savePassword';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Host";
      data.value = host.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Realm";
      data.value = realm.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Credentials";
      data.value = credentials.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return credentials;
    }
  }
});