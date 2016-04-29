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