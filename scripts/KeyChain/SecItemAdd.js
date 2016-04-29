'use strict';
Interceptor.attach(Module.findExportByName('Security', 'SecItemAdd'), {
  onEnter: function(args) {
      var strSecItemAddBlob = '';
      var dict = new ObjC.Object(args[0]);
      var iter = dict.keyEnumerator();
      var key;
      while ((key = iter.nextObject()) !== null) {
        var value = dict.objectForKey_(key);
        if (key.toString() === 'v_Data') {
          var parsed_value = ObjC.classes.NSKeyedUnarchiver.unarchiveObjectWithData_(value);
          strSecItemAddBlob += '\t[-] ' + key + ' => \n' + parsed_value + '\n';
        } else {
          strSecItemAddBlob += '\t' + key + ': ' + value + '\n';
        }
      }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'KeyChain';
      send_data.lib = 'Security';
      send_data.method = 'SecItemAdd';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Keychain-Write";
      data.value = strSecItemAddBlob
      data.argSeq = 1;
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