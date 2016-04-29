'use strict';

var resolver = new ApiResolver('objc');
var module = {};
const pendingBlocks = new Set();

resolver.enumerateMatches('-[LAContext evaluatePolicy:localizedReason:reply:]', {
  onMatch: function(match) {
    module.name = match.name;
    module.address = match.address;
  },
  onComplete: function() {}
});

Interceptor.attach(module.address, {
  onEnter: function(args) {
    
    var reason = new ObjC.Object(args[3]);
    console.log(reason);
    
    var block = new ObjC.Block(args[4]);
    pendingBlocks.add(block); // keep it alive
    
    var appCallback = block.implementation;
    
    block.implementation = function (success, error) {
      console.log('Fingerprint Matched: ' + success);
      var success = true;
      appCallback(success, error);
      pendingBlocks.delete(block);
    };
  }
});