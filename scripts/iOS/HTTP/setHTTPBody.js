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
var NSMutableURLRequest_setHTTPBody = {};
var hexify = function (hexdump_output) {
  var hexified = " ";
  var raw_array = hexdump_output.split("\n");
  for (var a = 0; a < raw_array.length; a++) {
    var line_array = raw_array[a].split(" ");
    for (var b = 1; b < line_array.length - 1; b++) {
      if(line_array[b].length === 2){
        hexified += line_array[b];
        hexified = hexified.trim()
      }
    }
  };
  return hexified;
};
resolver.enumerateMatches('-[NSMutableURLRequest setHTTPBody:]', {
  onMatch: function(match) {
    NSMutableURLRequest_setHTTPBody.name = match.name;
    NSMutableURLRequest_setHTTPBody.address = match.address;
  },
  onComplete: function() {}
});
if (NSMutableURLRequest_setHTTPBody.address) {
  Interceptor.attach(NSMutableURLRequest_setHTTPBody.address, {
    onEnter: function(args) {
        var send_data = {};
        var body = new ObjC.Object(args[0]);
        var HTTPBody = body.HTTPBody();
        var HTTPContentType = body.HTTPContentType();
        var HTTPExtraCookies = body.HTTPExtraCookies();
        var URL = body.URL();
        var HTTPMethod = body.HTTPMethod();
        var fields = body.allHTTPHeaderFields();
        var str_body = {
          'colored': '',
          'raw': ''
        };
        if (URL != null) {
          var str_url = HTTPMethod.toString() + " " + URL.toString() + '\n';
          var key;
          var str_headers = '';
          var decode_type = '';
          if (fields) {
            var enumerator = fields.keyEnumerator();
            while ((key = enumerator.nextObject()) !== null) {
              var value = fields.objectForKey_(key);
              str_headers += key.toString() + ': ' + value.toString() + '\n';
              if (key.toString().indexOf('Content-Type') > -1 && value.toString().indexOf('multipart/form-data;') > -1) {
                decode_type = 'bytes';
              }
            }
          }
          if (HTTPBody !== undefined && HTTPBody !== null && typeof HTTPBody.bytes === 'function') {
            if (decode_type !== 'bytes') {
              str_body.colored = Memory.readUtf8String(HTTPBody.bytes(), HTTPBody.length());
              str_body.raw = str_body.colored;
            } else {
              var buf = Memory.readByteArray(HTTPBody.bytes(), HTTPBody.length());
              str_body.raw = hexify(hexdump(buf));
            }
            var data_raw = str_url + str_headers + '\n' + str_body.raw + '\n';
          }
        }
        if (data_raw !== undefined && data_raw !== 'undefined' && data_raw !== '') {
          /*   --- Payload Header --- */
          send_data.time = new Date();
          send_data.txnType = 'HTTP POST';
          send_data.lib = 'libobjc.a.dylib';
          send_data.method = '-[NSMutableURLRequest setHTTPBody:]';
          send_data.artifact = [];
          /*   --- Payload Body --- */
          var data = {};
          data.name = "HTTP Request";
          data.value = data_raw;
          data.argSeq = 1;
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