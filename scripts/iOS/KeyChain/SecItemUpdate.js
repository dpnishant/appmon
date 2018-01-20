'use strict';
Interceptor.attach(Module.findExportByName('Security', 'SecItemUpdate'), {
  onEnter: function(args) {
    var strSecItemUpdateBlob = '';
      var dict = new ObjC.Object(args[1]);
      var iter = dict.keyEnumerator();
      var key;
      while ((key = iter.nextObject()) !== null) {
        var value = dict.objectForKey_(key);
        if (key.toString() === 'v_Data') {
          var v_Data = new ObjC.Object(value);
          try {
            v_Data =  Memory.readUtf8String(v_Data.bytes(), v_Data.length());
          } catch (e) {
            v_Data = Memory.readByteArray(v_Data.bytes(), v_Data.length());
          }
          value = v_Data;
        }
        strSecItemUpdateBlob += key.toString().trim() + ': ' + value.toString().trim();
    }
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'KeyChain';
      send_data.lib = 'Security';
      send_data.method = 'SecItemUpdate';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Keychain-Update";
      data.value = strSecItemUpdateBlob
      data.argSeq = 1;
      send_data.artifact.push(data);
      // console.log(JSON.stringify(send_data));
      send(JSON.stringify(send_data));
    }
    /** Omitting onLeave due to performance overhead **/
    /**
    ,onLeave: function (retval) {
      //console.log('Return Value: ' + Memory.readUtf8String(retval));
      }
    **/
});