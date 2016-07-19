'use strict';
var resolver = new ApiResolver('objc');
var UIDevice_identifierForVendor = {};
var UIDevice_identifierForVendor_blacklist = [
  'UIKit', 'libobjc.A.dylib',
  'WebKitLegacy', 'libdispatch.dylib',
  'CoreFoundation', 'Foundation',
  'libsystem_pthread.dylib', 'UIFoundation'
];
var array_search = function(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) return true;
  }
  return false;
}
resolver.enumerateMatches('-[UIDevice identifierForVendor]', {
  onMatch: function(match) {
    UIDevice_identifierForVendor.name = match.name;
    UIDevice_identifierForVendor.address = match.address;
  },
  onComplete: function() {}
});
if (UIDevice_identifierForVendor.address) {
  Interceptor.attach(UIDevice_identifierForVendor.address, {
    onLeave: function (retval) {
      var UUID = new ObjC.Object(retval);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Device Indentifier';
      send_data.lib = 'libobjc.a.dylib';
      send_data.method = '-[UIDevice identifierForVendor]';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {}
      data.name = "UUID";
      data.value = UUID.UUIDString().toString();
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
    }
  });
}