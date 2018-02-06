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
var mode = "";

var byteArraytoHexString = function(byteArray) {
  if (byteArray && byteArray.map) {
    return byteArray.map(function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  } else {
    return JSON.stringify(byteArray);
  }
}

var hexToAscii = function(input) {
  var hex = input.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

var normalizeInput = function(input) {
  if (input.array) {
    var normalized = byteArraytoHexString(input.array());
  } else if (input.length && input.length > 0) {
    var normalized = byteArraytoHexString(input);
  } else {
    var normalized = JSON.stringify(input);
  }
  return normalized;
}

var getMode = function(Cipher, mode) {
  if (mode === 2) {
    mode = "DECRYPT";
  } else if (mode === 1) {
    mode = "ENCRYPT";
  }
  return mode;
}

var getRandomValue = function(arg) {
  if (!arg) { return 'null'; }
  var type = arg.toString().split('@')[0].split('.');
  type = type[type.length - 1];
  if (type === "SecureRandom") {
    if (arg.getSeed) {
      return byteArraytoHexString(arg.getSeed(10));
    }
  }
}

var normalizeKey = function(cert_or_key) {
  var type = cert_or_key.toString().split('@')[0].split('.');
  type = type[type.length - 1];
  if (type === "SecretKeySpec") {
    return byteArraytoHexString(cert_or_key.getEncoded());
  } else {
    return "non-SecretKeySpec: " + cert_or_key.toString() + ", encoded: " + byteArraytoHexString(cert_or_key.getEncoded()) + ", object: " + JSON.stringify(cert_or_key);
  }

}

Java.perform(function() {
  var Cipher = Java.use("javax.crypto.Cipher");
  var PBEKeySpec = Java.use("javax.crypto.spec.PBEKeySpec");
  var SecretKeySpec = Java.use("javax.crypto.spec.SecretKeySpec");
  var SecureRandom = Java.use("java.security.SecureRandom");

  if (Cipher.getInstance) {
    Cipher.getInstance.overloads[0].implementation = function(transformation) {
      //console.log("Cipher.getInstance: " + transformation);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'getInstance';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = transformation;
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.getInstance.overloads[0].apply(this, arguments);
    }

    Cipher.getInstance.overloads[0].implementation = function(transformation, provider) {
      //console.log("Cipher.getInstance: " + transformation);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'getInstance';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = transformation;
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.getInstance.overloads[0].apply(this, arguments);
    }

    Cipher.getInstance.overloads[0].implementation = function(transformation, provider) {
      //console.log("Cipher.getInstance: " + transformation);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'getInstance';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = transformation;
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.getInstance.overloads[0].apply(this, arguments);
    }
  }

  if (Cipher.init) {
    Cipher.init.overloads[0].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[0].apply(this, arguments);
    }

    Cipher.init.overloads[1].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      data = {};
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[1].apply(this, arguments);
    }

    Cipher.init.overloads[2].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[2].apply(this, arguments);
    }

    Cipher.init.overloads[3].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[3].apply(this, arguments);
    }

    Cipher.init.overloads[4].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[4].apply(this, arguments);
    }

    Cipher.init.overloads[5].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[5].apply(this, arguments);
    }

    Cipher.init.overloads[6].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[6].apply(this, arguments);
    }

    Cipher.init.overloads[7].implementation = function(opmode, cert_or_key, params_or_random) {
      if (opmode) {
        //console.log("Mode: " + getMode(this, opmode));
      }
      if (cert_or_key) {
        //console.log("Key: " + normalizeKey(cert_or_key));
      }
      if (params_or_random) {
        //console.log(getRandomValue(params_or_random));
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'init';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Operation Mode";
      data.value = getMode(this, opmode);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Key";
      data.value = normalizeKey(cert_or_key);
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Random Value";
      data.value = getRandomValue(params_or_random);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.init.overloads[7].apply(this, arguments);
    }

  }

  if (Cipher.doFinal) {
    Cipher.doFinal.overloads[0].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[0].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }

    Cipher.doFinal.overloads[1].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[1].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }


    Cipher.doFinal.overloads[2].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[2].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }


    Cipher.doFinal.overloads[3].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[3].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }


    Cipher.doFinal.overloads[4].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[4].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }


    Cipher.doFinal.overloads[5].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[5].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }


    Cipher.doFinal.overloads[6].implementation = function(input) {
      if (input) {
        //console.log("Input Data: " + normalizeInput(input));
      }
      //console.log("Cipher.getAlgorithm: " + this.getAlgorithm());
      //console.log("Cipher.getIV: " + byteArraytoHexString(this.getIV()));
      //console.log("Cipher.getBlockSize: " + this.getBlockSize());
      var retVal = this.doFinal.overloads[6].apply(this, arguments);
      //console.log("Cipher.doFinal retVal: " + byteArraytoHexString(retVal));
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'javax.crypto.Cipher';
      send_data.method = 'doFinal';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Algorithm";
      data.value = this.getAlgorithm();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Initialization Vector";
      data.value = byteArraytoHexString(this.getIV());
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Block Size";
      data.value = this.getBlockSize();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      data = {};
      data.name = "Output";
      data.value = byteArraytoHexString(retVal);
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return retVal;
    }

  }

  if (SecureRandom.setSeed) {
    SecureRandom.setSeed.overloads[0].implementation = function(seed) {
      //console.log("SecureRandom.setSeed: " + seed);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.SecureRandom';
      send_data.method = 'setSeed';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Seed Value";
      data.value = seed;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.setSeed.overloads[0].apply(this, arguments);
    }

    SecureRandom.setSeed.overloads[1].implementation = function(seed) {
      //console.log("SecureRandom.setSeed: " + seed);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Crypto';
      send_data.lib = 'java.security.SecureRandom';
      send_data.method = 'setSeed';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Seed Value";
      data.value = seed;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.setSeed.overloads[1].apply(this, arguments);
    }
  }
});
