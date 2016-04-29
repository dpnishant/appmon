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