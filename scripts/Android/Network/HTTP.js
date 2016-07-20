'use strict';

var methodURL = "";
var requestHeaders = "";
var requestBody = "";
var responseHeaders = "";
var responseBody = "";

Java.perform(function() {
  var HttpURLConnection = Java.use("com.android.okhttp.internal.http.HttpURLConnectionImpl");
  HttpURLConnection.getInputStream.overloads[0].implementation = function() {
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
          responseHeaders +=  Keys[key] + ": " + Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        } else if (Values[key]) {
          responseHeaders +=  Values[key].toString().replace(/\[/gi, "").replace(/\]/gi, "") + "\n";
        }
      }
    }
    var InputStream = Java.use("java.io.BufferedInputStream").$new(stream);
    while(InputStream.available() > 0) {
      var sb = Java.use("java.lang.StringBuilder").$new();
      var InputStreamReader = Java.use("java.io.InputStreamReader").$new(InputStream);
      var BufferedReader = Java.use("java.io.BufferedReader").$new(InputStreamReader);
      
      if (BufferedReader) {
        for (var line = BufferedReader.readLine(); line != null; line = BufferedReader.readLine()) {
          sb.append(line);
        }
      }
      responseBody = sb.toString();
    }
    //var divider = "\n==================\n";
    //console.log(methodURL + "\n" + requestHeaders + "\n" + requestBody + "\n\n" + responseHeaders + "\n" + responseBody + divider);

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