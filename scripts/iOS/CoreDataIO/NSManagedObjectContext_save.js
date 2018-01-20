/**
 * Copyright (c) 2016 Nishant Das Patnaik.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

'use strict';
var resolver = new ApiResolver('objc');
var NSManagedObjectContext_save = {};
resolver.enumerateMatches('-[NSManagedObjectContext save:]', {
  onMatch: function (match) {
    if (match.name === '-[NSManagedObjectContext save:]') {
      NSManagedObjectContext_save.name = match.name;
      NSManagedObjectContext_save.address = match.address;
    }
  },
  onComplete: function () {}
});
if (NSManagedObjectContext_save.address) {
  Interceptor.attach(NSManagedObjectContext_save.address, {
    onEnter: function (args) {
      var obj = new ObjC.Object(args[0]);
      var inserted = obj.insertedObjects();
      var updated = obj.updatedObjects();
      var deleted = obj.deletedObjects();
      var log = {};
      inserted = inserted.objectEnumerator().allObjects();
      updated = updated.objectEnumerator().allObjects();
      deleted = deleted.objectEnumerator().allObjects();
      // console.log(inserted.objectAtIndex_(0).description());
      log['inserted'] = [];
      log['updated'] = []
      log['deleted'] = [];
      for (var i = 0, count = inserted.count().valueOf(); i !== count; i++) { 
        log['inserted'].push(inserted.objectAtIndex_(i).description().UTF8String());
      }
      for (var i = 0, count = updated.count().valueOf(); i !== count; i++) {
        log['updated'].push(updated.objectAtIndex_(i).description().UTF8String());
      }
      for (var i = 0, count = deleted.count().valueOf(); i !== count; i++) {
        log['deleted'].push(deleted.objectAtIndex_(i).description().UTF8String());
      } 
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'Core Data';
      send_data.lib = 'libobjc.a.dylib';
      send_data.method = '-[NSManagedObjectContext save:]';
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "CoreData Write";
      data.value = log;
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      // console.log(JSON.stringify(send_data));
    }
  });
}