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
var sqlite3_prepare_v2 = Module.findExportByName('libsqlite3.dylib', 'sqlite3_prepare_v2');
var sqlite3_bind_int = Module.findExportByName('libsqlite3.dylib', 'sqlite3_bind_int');
var sqlite3_bind_text = Module.findExportByName('libsqlite3.dylib', 'sqlite3_bind_text');
var sql_query = '';
Interceptor.attach(sqlite3_bind_int, {
  onEnter: function(args) {
      var val = args[2].toInt32();
      sql_query = sql_query.replace('?', val);
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLite';
      send_data.lib = 'libsqlite3.dylib';
      send_data.method = 'sqlite3_bind_int';
      send_data.artifact = [];
      if (!sql_query.toString().match(/\?\s?[\=\s\,\;]?/gi)) {
        var data = {};
        data.name = "SQL Query - Values Bound";
        data.value = sql_query;
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
Interceptor.attach(sqlite3_bind_text, {
  onEnter: function(args) {
      var val = Memory.readUtf8String(args[2]);
      sql_query = sql_query.replace('?', val);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLite';
      send_data.lib = 'libsqlite3.dylib';
      send_data.method = 'sqlite3_bind_text';
      send_data.artifact = [];

      /*   --- Payload Body --- */
      if (!sql_query.toString().match(/\?\s?[\=\s\,\;]?/gi)) {
        var data = {};
        data.name = "SQL Query - Values Bound";
        data.value = sql_query;
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
Interceptor.attach(sqlite3_prepare_v2, {
  onEnter: function(args) {
      sql_query = '';
      sql_query = Memory.readUtf8String(args[1]);
      //send('SQL: ' + sql_query);
    }
    /** Omitting onLeave due to performance overhead **/
    /**
      ,onLeave: function (retval) {
        //console.log('Return Value: ' + Memory.readUtf8String(retval));
      }
    **/
});