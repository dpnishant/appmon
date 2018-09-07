'use strict';
var resolver = new ApiResolver('objc');
var NSURLConnection_start = {};
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
resolver.enumerateMatches('-[NSURLConnection start]', {
  onMatch: function(match) {
    NSURLConnection_start.name = match.name;
    NSURLConnection_start.address = match.address;
  },
  onComplete: function() {}
});
if (NSURLConnection_start.address) {
  Interceptor.attach(NSURLConnection_start.address, {
    onEnter: function(args) {
        var send_data = {};
        var conn = new ObjC.Object(args[0]);
        var req = conn.originalRequest();
        var HTTPBody = req.HTTPBody();
        var HTTPContentType = req.HTTPContentType();
        var HTTPExtraCookies = req.HTTPExtraCookies();
        var URL = req.URL();
        var HTTPMethod = req.HTTPMethod();
        var fields = req.allHTTPHeaderFields();
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
              try {
                str_body.colored = Memory.readUtf8String(HTTPBody.bytes(), HTTPBody.length());
                str_body.raw = str_body.colored;
              } catch (e) {
                str_body.colored = hexify(hexdump(Memory.readByteArray(HTTPBody.bytes(), HTTPBody.length())));
                str_body.raw = str_body.colored;
              }
              
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
          send_data.method = '-[NSURLConnection start]';
          send_data.trace = trace();
          send_data.artifact = [];
          /*   --- Payload Body --- */
          var data = {};
          data.name = "HTTP Request";
          data.value = data_raw;
          data.argSeq = 1;
          send_data.artifact.push(data);
          send(JSON.stringify(send_data));
          // console.log(JSON.stringify(send_data));
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