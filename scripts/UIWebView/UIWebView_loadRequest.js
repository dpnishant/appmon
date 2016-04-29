'use strict';
var resolver = new ApiResolver('objc');
var UIWebView_loadRequest = {};
resolver.enumerateMatches('-[UIWebView loadRequest:]', {
  onMatch: function(match) {
    if (match.name === '-[UIWebView loadRequest:]') {
      UIWebView_loadRequest.name = match.name;
      UIWebView_loadRequest.address = match.address;
    }
  },
  onComplete: function() {}
});
if (UIWebView_loadRequest.address) {
  Interceptor.attach(UIWebView_loadRequest.address, {
    onEnter: function(args) {
        var url = new ObjC.Object(args[2]);
        if (url.URL().toString().trim() !== undefined && url.URL().toString().trim() !== null && url.URL().toString().trim() !== '' && url.URL().toString().trim() !== '\n\n') {
          /*   --- Payload Header --- */
          var send_data = {};
          send_data.time = new Date();
          send_data.txnType = 'UIWebView';
          send_data.lib = 'libobjc.a.dylib';
          send_data.method = '-[UIWebView loadRequest:]';
          send_data.artifact = [];
          /*   --- Payload Body --- */
          var data = {};
          data.name = "URL";
          data.value = url.URL().toString();
          data.argSeq = 3;
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