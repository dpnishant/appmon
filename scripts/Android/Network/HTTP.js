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

var methodURL = "";
var requestHeaders = "";
var requestBody = "";
var responseHeaders = "";
var responseBody = "";

Java.perform(function() {
  try {
    var HttpURLConnection = Java.use("com.android.okhttp.internal.http.HttpURLConnectionImpl");
  } catch (e) {
    try {
      var HttpURLConnection = Java.use("com.android.okhttp.internal.huc.HttpURLConnectionImpl");
    } catch (e) { return }
  }
  //var BufferedInputStream = Java.use("java.io.BufferedInputStream");
  //var StringBuilder = Java.use("java.lang.StringBuilder");
  var InputStreamReader =  Java.use("java.io.InputStreamReader");
  var BufferedReader = Java.use("java.io.BufferedReader");
  
  HttpURLConnection.getInputStream.overloads[0].implementation = function() {
    try {
      methodURL = "";
    responseHeaders = "";
    responseBody = "";
    var Connection = this;
    var stream = this.getInputStream.overloads[0].apply(this, arguments);

    var requestURL = Connection.getURL().toString();
    var requestMethod = Connection.getRequestMethod();
    var requestProperties
    methodURL = requestMethod + " " + requestURL;
    if (Connection.getHeaderFields) {
      var Keys = Connection.getHeaderFields().keySet().toArray();
      var Values = Connection.getHeaderFields().values().toArray();
      responseHeaders = "";
      for (var key in Keys) {
        if (Keys[key] && Keys[key] !== null && Values[key]) {
          responseHeaders += Keys[key] + ": " + Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        } else if (Values[key]) {
          responseHeaders += Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        }
      }
    }
    if (stream) {
      var BufferedReaderStream = BufferedReader.$new(InputStreamReader.$new(stream));
      var inputLine = "";
    while ((inputLine = BufferedReaderStream.readLine()) != null){
      responseBody += inputLine + "\n";
    }
    BufferedReaderStream.close();

    //var divider = "\n==================\n";
    //console.log(methodURL + "\n" + requestHeaders + "\n" + requestBody + "\n\n" + responseHeaders + "\n" + responseBody + divider);

    }
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'HTTP';
    send_data.lib = 'com.android.okhttp.internal.http.HttpURLConnectionImpl';
    send_data.method = 'getInputStream';
    send_data.artifact = [];
    /*   --- Payload Body --- */
    var data = {};
    data.name = "Request/Response";
    data.value = methodURL + "\n" + requestHeaders + "\n" + requestBody + "\n\n" + responseHeaders + "\n" + responseBody;
    data.argSeq = 0;
    send_data.artifact.push(data);
    send(JSON.stringify(send_data));
    return stream;
    } catch (e) {
      this.getInputStream.overloads[0].apply(this, arguments);
    }
  }

  HttpURLConnection.getOutputStream.overloads[0].implementation = function() {
    requestHeaders = "";
    requestBody = "";
    var Connection = this;
    if (Connection.getRequestProperties) {
      var Keys = Connection.getRequestProperties().keySet().toArray();
      var Values = Connection.getRequestProperties().values().toArray();
      requestHeaders = "";
      for (var key in Keys) {
        if (Keys[key] && Keys[key] !== null && Values[key]) {
          requestHeaders += Keys[key] + ": " + Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        } else if (Values[key]) {
          requestHeaders += Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        }
      }
    }
    var stream = this.getOutputStream.overloads[0].apply(this, arguments);
    return stream;
  }
});
