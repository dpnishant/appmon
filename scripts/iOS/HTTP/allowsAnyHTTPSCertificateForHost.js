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
var NSURLRequest_allowsAnyHTTPSCertificateForHost = {};
resolver.enumerateMatches('+[NSURLRequest allowsAnyHTTPSCertificateForHost:]', {
  onMatch: function(match) {
    NSURLRequest_allowsAnyHTTPSCertificateForHost.name = match.name;
    NSURLRequest_allowsAnyHTTPSCertificateForHost.address = match.address;
  },
  onComplete: function() {}
});
if (NSURLRequest_allowsAnyHTTPSCertificateForHost.address) {
  Interceptor.attach(NSURLRequest_allowsAnyHTTPSCertificateForHost.address, {
    onEnter: function(args) {
        var host = '';
        var host_raw = new ObjC.Object(args[2]);
        var host = host_raw.toString();
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'SSL Certificate - Accept Any';
        send_data.lib = 'libobjc.a.dylib';
        send_data.method = '+[NSURLRequest allowsAnyHTTPSCertificateForHost:]';
        send_data.artifact = [];
        /*   --- Payload Body --- */
        var data = {}
        data.name = "Host";
        data.value = host;
        data.argSeq = 3;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      }
      /** Omitting onLeave due to performance overhead **/
      /**
      ,onLeave: function (retval) {
        //console.log('Return Value: ' + Memory.readUtf8String(retval));
      }
      **/
  });
}