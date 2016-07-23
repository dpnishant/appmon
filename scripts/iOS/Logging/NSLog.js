var NSLog = Module.findExportByName('Foundation', 'NSLog');
var NSLogv = Module.findExportByName('Foundation', 'NSLogv');

Interceptor.attach(NSLog, {
  onEnter: function(args) {
    var logMessage = new ObjC.Object(args[0]);
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Logging';
    send_data.lib = 'Foundation';
    send_data.method = 'NSLog';
    send_data.artifact = [];
    var data = {};
    data.name = "Log Message";
    data.value = logMessage.toString();
    data.argSeq = 0;
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

Interceptor.attach(NSLogv, {
  onEnter: function(args) {
    var logMessage = new ObjC.Object(args[0]);
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Logging';
    send_data.lib = 'Foundation';
    send_data.method = 'NSLogv';
    send_data.artifact = [];
    var data = {};
    data.name = "Log Message";
    data.value = logMessage.toString();
    data.argSeq = 0;
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