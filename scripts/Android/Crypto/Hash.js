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

var byteArraytoHexString = function(byteArray) {
  if (!byteArray) { return 'null'; }
  if (byteArray.map) {
    return byteArray.map(function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  } else {
    return byteArray + "";
  }
}

var hexToAscii = function(input) {
  var hex = input.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

var updateInput = function(input) {
  if (input.length && input.length > 0) {
    var normalized = byteArraytoHexString(input);
  } else if (input.array) {
    var normalized = byteArraytoHexString(input.array());
  } else {
    var normalized = input.toString();
  }
  return normalized;
}

Java.perform(function() {
  var MessageDigest = Java.use("java.security.MessageDigest");

  if (MessageDigest.digest) {
    MessageDigest.digest.overloads[0].implementation = function() {
      var digest = this.digest.overloads[0].apply(this, arguments);
      var algorithm = this.getAlgorithm().toString();
      //console.log("MessageDigest.getAlgorithm: " + algorithm);
      //console.log("MessageDigest.digest: " + byteArraytoHexString(digest));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'digest';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = algorithm;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Digest";
      data.value = byteArraytoHexString(digest);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return digest;
    }

    MessageDigest.digest.overloads[1].implementation = function(input) {
      var digest = this.digest.overloads[1].apply(this, arguments);
      var algorithm = this.getAlgorithm().toString();
      //console.log("MessageDigest.getAlgorithm: " + algorithm);
      //console.log("MessageDigest.digest: " + byteArraytoHexString(digest));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'digest';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = algorithm;
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Digest";
      data.value = byteArraytoHexString(digest);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return digest;
    }
  }

  if (MessageDigest.update) {
    MessageDigest.update.overloads[0].implementation = function(input) {
      //console.log("MessageDigest.update input: " + updateInput(input));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'update';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Raw Data";
      data.value = updateInput(input);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));

      return this.update.overloads[0].apply(this, arguments);
    }

    MessageDigest.update.overloads[1].implementation = function(input, offset, len) {
      //console.log("MessageDigest.update input: " + updateInput(input));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'update';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Raw Data";
      data.value = updateInput(input);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.update.overloads[1].apply(this, arguments);
    }

    MessageDigest.update.overloads[2].implementation = function(input) {
      //console.log("MessageDigest.update input: " + updateInput(input));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'update';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Raw Data";
      data.value = updateInput(input);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.update.overloads[2].apply(this, arguments);
    }

    MessageDigest.update.overloads[3].implementation = function(input) {
      //console.log("MessageDigest.update input: " + updateInput(input));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.MessageDigest';
      send_data.method = 'update';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Raw Data";
      data.value = updateInput(input);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.update.overloads[3].apply(this, arguments);
    }
  }

});
