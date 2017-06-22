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

var x509_der_cert;

Interceptor.attach(Module.findExportByName('Security', 'SecCertificateCreateWithData'), {
  onEnter: function(args) {
    var data = new ObjC.Object(args[1]);
    x509_der_cert = hexify(hexdump(data.bytes(), {
      length: data.length()
    }));

    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'X.509 Certificate';
    send_data.lib = 'Security';
    send_data.method = 'SecCertificateCreateWithData';  //A DER (Distinguished Encoding Rules) representation of an X.509 certificate
    send_data.artifact = [];

    /*   --- Payload Body --- */
    var data = {};
    data.name = "X.509 certificate (.DER Format)";
    data.value = x509_der_cert;
    data.argSeq = 2;
    send_data.artifact.push(data);
    send(JSON.stringify(send_data));
  }
});
