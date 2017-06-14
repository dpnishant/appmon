/*
 Copyright (c) 2016 Nishant Das Patnaik.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

'use strict';

var resolver = new ApiResolver('objc');
var module = {};
//const pendingBlocks = new Set();
var pendingBlocks = [];


resolver.enumerateMatches('-[LAContext evaluatePolicy:localizedReason:reply:]', {
  onMatch: function(match) {
    module.name = match.name;
    module.address = match.address;
    Interceptor.attach(module.address, {
      onEnter: function(args) {
        var reason = new ObjC.Object(args[3]);
        console.log(reason);

        var block = new ObjC.Block(args[4]);

        //pendingBlocks.add(block); // keep it alive
        pendingBlocks.push(block); // keep it alive

        var appCallback = block.implementation;

        block.implementation = function (success, error) {
          console.log('Fingerprint Matched: ' + success);
          success = true;
          appCallback(success, error);
          //pendingBlocks.delete(block);
          pendingBlocks.splice(pendingBlocks.indexOf(block), 1);
        };
      }    
    });
  },
  onComplete: function() {}
});

