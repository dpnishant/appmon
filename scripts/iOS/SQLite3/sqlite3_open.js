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
var sqlite3_open = Module.findExportByName('libsqlite3.dylib', 'sqlite3_open');
var sqlitedb_path = '';
Interceptor.attach(sqlite3_open, {
  onEnter: function(args) {
      sqlitedb_path = Memory.readUtf8String(args[0]);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLite';
      send_data.lib = 'libsqlite3.dylib';
      send_data.method = 'sqlite3_open';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQLite DB - Connect";
      data.value = sqlitedb_path;
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