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
'import utilities';

var sha1_data;
var sha1_digest;

Interceptor.attach(Module.findExportByName('libcommonCrypto.dylib', 'CC_SHA1'), {
  onEnter: function(args) {
    var data = hexify(hexdump(args[0], {
      length: args[1].toInt32()
    }));
    sha1_data = data;
  },

  onLeave: function(retval) {
    var SHA1 = hexify(hexdump(retval, {
      length: 20
    }));
    sha1_digest = SHA1;

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'SHA1 Hash';
    send_data.lib = 'libcommonCrypto.dylib';
    send_data.method = 'CC_SHA1';
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "SHA1 Data";
    data.value = sha1_data;
    data.argSeq = 2;
    send_data.artifact.push(data);

    /*   --- Payload Body --- */
    var data = {};
    data.name = "SHA1 Digest";
    data.value = sha1_digest;
    data.argSeq = 3;
    send_data.artifact.push(data);

    send(JSON.stringify(send_data));
  }
});
