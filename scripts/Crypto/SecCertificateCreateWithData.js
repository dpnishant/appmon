'use strict';

var x509_der_cert;

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
