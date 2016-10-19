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
var resolver = new ApiResolver('objc');
var UIWebView_loadHTMLString = {};
resolver.enumerateMatches('-[UIWebView loadHTMLString:baseURL:]', {
  onMatch: function(match) {
    if (match.name === '-[UIWebView loadHTMLString:baseURL:]') {
      UIWebView_loadHTMLString.name = match.name;
      UIWebView_loadHTMLString.address = match.address;
    }
  },
  onComplete: function() {}
});
if (UIWebView_loadHTMLString.address) {
  Interceptor.attach(UIWebView_loadHTMLString.address, {
    onEnter: function(args) {
        var html_string = new ObjC.Object(args[2]);
        var base_url = new ObjC.Object(args[3]);
        if (html_string.toString().trim() !== undefined && html_string.toString().trim() !== null && html_string.toString().trim() !== '' && html_string.toString().trim() !== '\n\n') {
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'UIWebView';
          send_data.lib = 'libobjc.a.dylib';
          send_data.method = '-[UIWebView loadHTMLString:baseURL:]';
          send_data.artifact = [];
          /*   --- Payload Body --- */
          var data = {};
          data.name = "HTML STRING";
          data.value = html_string.toString();
          data.argSeq = 3;
          send_data.artifact.push(data);
          /*   --- Payload Body --- */
          var data = {};
          data.name = "Base URL";
          data.value = base_url.toString();
          data.argSeq = 4;
          send_data.artifact.push(data);
          send(JSON.stringify(send_data));
        }
      }
      /** Omitting onLeave due to performance overhead **/
      /**
      ,onLeave: function (retval) {
        //console.log('Return Value: ' + Memory.readUtf8String(retval));
      }
      **/
  });
}