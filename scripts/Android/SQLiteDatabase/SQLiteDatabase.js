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

var byteArraytoHexString = function(byteArray) {
  if (byteArray && byteArray.map) {
    return byteArray.map(function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  } else {
    return byteArray + "";
  }
}

var normalize = function(input) {
  if (input.length && input.length > 0) {
    var normalized = byteArraytoHexString(input);
  } else if (input.array) {
    var normalized = byteArraytoHexString(input.array());
  } else {
    var normalized = input.toString();
  }
  return normalized;
}


var hexToAscii = function(input) {
  var hex = input.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

Java.perform(function() {
  var SQLiteDatabase = Java.use("android.database.sqlite.SQLiteDatabase");

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#execSQL(java.lang.String)
  if (SQLiteDatabase.execSQL) {
    SQLiteDatabase.execSQL.overloads[0].implementation = function(sql) {
      //console.log('SQLiteDatabase.execSQL sql: ' + sql.toString());
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'execSQL';
      send_data.trace = trace();
      send_data.artifact = [];
      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.execSQL.overloads[0].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#execSQL(java.lang.String, java.lang.Object[])
  if (SQLiteDatabase.execSQL) {


    SQLiteDatabase.execSQL.overloads[1].implementation = function(sql, bindArgs) {

      //console.log('SQLiteDatabase.execSQL sql: ' + sql.toString());
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'execSQL';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (bindArgs) {
        //console.log('SQLiteDatabase.execSQL bindArgs: ' + bindArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "SQL BindArgs";
        data.value = bindArgs ? bindArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }

      send(JSON.stringify(send_data));
      return this.execSQL.overloads[1].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#getPath()
  if (SQLiteDatabase.getPath) {
    SQLiteDatabase.getPath.implementation = function() {
      var dbPath = this.getPath.call(this);
      //console.log("SQLiteDatabase.getPath DB: " + dbPath);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'getPath';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DB Path";
      data.value = dbPath ? dbPath.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return dbPath;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#insert(java.lang.String, java.lang.String, android.content.ContentValues)
  if (SQLiteDatabase.insert) {
    SQLiteDatabase.insert.implementation = function(table, nullColumnHack, values) {
      //console.log("SQLiteDatabase.insert table: " + table);
      //console.log("SQLiteDatabase.insert nullColumnHack: " + nullColumnHack);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'insert';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table Name";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "NullColumnHack";
      data.value = nullColumnHack ? nullColumnHack.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (values) {
        //console.log("SQLiteDatabase.insert values: " + values.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Values";
        data.value = values ? values.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }

      send(JSON.stringify(send_data));
      return this.insert.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#insertOrThrow(java.lang.String, java.lang.String, android.content.ContentValues)
  if (SQLiteDatabase.insertOrThrow) {
    SQLiteDatabase.insertOrThrow.implementation = function(table, nullColumnHack, values) {
      //console.log("SQLiteDatabase.insertOrThrow table: " + table);
      //console.log("SQLiteDatabase.insertOrThrow nullColumnHack: " + nullColumnHack);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'insertOrThrow';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table Name";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "NullColumnHack";
      data.value = nullColumnHack ? nullColumnHack.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (values) {
        //console.log("SQLiteDatabase.insertOrThrow values: " + values.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Values";
        data.value = values ? values.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }

      send(JSON.stringify(send_data));
      return this.insertOrThrow.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#insertWithOnConflict(java.lang.String, java.lang.String, android.content.ContentValues, int)
  if (SQLiteDatabase.insertWithOnConflict) {
    SQLiteDatabase.insertWithOnConflict.implementation = function(table, nullColumnHack, values, conflictAlgorithm) {
      //console.log("SQLiteDatabase.insertWithOnConflict table: " + table);
      //console.log("SQLiteDatabase.insertWithOnConflict nullColumnHack: " + nullColumnHack);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'insertWithOnConflict';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table Name";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "NullColumnHack";
      data.value = nullColumnHack ? nullColumnHack.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (values) {
        //console.log("SQLiteDatabase.insertWithOnConflict values: " + values.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Values";
        data.value = values ? values.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.insertWithOnConflict conflictAlgorithm: " + conflictAlgorithm);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "conflictAlgorithm";
      data.value = conflictAlgorithm ? conflictAlgorithm.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      send(JSON.stringify(send_data));
      return this.insertWithOnConflict.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#openDatabase(java.lang.String, android.database.sqlite.SQLiteDatabase.CursorFactory, int)
  if (SQLiteDatabase.openDatabase) {
    SQLiteDatabase.openDatabase.overloads[0].implementation = function(path, factory, flags) {
      if (flags === SQLiteDatabase.OPEN_READWRITE) {
        flags = "OPEN_READWRITE";
      } else if (flags === SQLiteDatabase.OPEN_READONLY) {
        flags = "OPEN_READONLY";
      } else if (flags === SQLiteDatabase.CREATE_IF_NECESSARY) {
        flags = "CREATE_IF_NECESSARY";
      } else if (flags === SQLiteDatabase.NO_LOCALIZED_COLLATORS) {
        flags = "NO_LOCALIZED_COLLATORS";
      }
      //console.log("SQLiteDatabase.openDatabase path: " + path);
      //console.log("SQLiteDatabase.openDatabase flags: " + flags);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'openDatabase';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DB Path";
      data.value = path ? path.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Flags";
      data.value = flags;
      data.argSeq = 0;

      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.openDatabase.overloads[0].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#openDatabase(java.lang.String, android.database.sqlite.SQLiteDatabase.CursorFactory, int, android.database.DatabaseErrorHandler)
  if (SQLiteDatabase.openDatabase) {


    SQLiteDatabase.openDatabase.overloads[1].implementation = function(path, factory, flags, errorHandler) {
      if (flags === SQLiteDatabase.OPEN_READWRITE) {
        flags = "OPEN_READWRITE";
      } else if (flags === SQLiteDatabase.OPEN_READONLY) {
        flags = "OPEN_READONLY";
      } else if (flags === SQLiteDatabase.CREATE_IF_NECESSARY) {
        flags = "CREATE_IF_NECESSARY";
      } else if (flags === SQLiteDatabase.NO_LOCALIZED_COLLATORS) {
        flags = "NO_LOCALIZED_COLLATORS";
      }
      //console.log("SQLiteDatabase.openDatabase path: " + path);
      //console.log("SQLiteDatabase.openDatabase flags: " + flags);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'openDatabase';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DB Path";
      data.value = path ? path.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Flags";
      data.value = flags;
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.openDatabase.overloads[1].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#openOrCreateDatabase(java.io.File, android.database.sqlite.SQLiteDatabase.CursorFactory)
  if (SQLiteDatabase.openOrCreateDatabase) {
    SQLiteDatabase.openOrCreateDatabase.overloads[0].implementation = function(file, factory) {
      if (file) {
        //console.log("SQLiteDatabase.openOrCreateDatabase dbPath: " + file.toString());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'SQLiteDatabase';
        send_data.lib = 'android.database.sqlite.SQLiteDatabase';
        send_data.method = 'openOrCreateDatabase';
        send_data.trace = trace();
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "DB Path";
        data.value = file ? file.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      }
      return this.openOrCreateDatabase.overloads[0].apply(this, arguments);
    }
  }

  //Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#openOrCreateDatabase(java.lang.String, android.database.sqlite.SQLiteDatabase.CursorFactory, android.database.DatabaseErrorHandler)
  if (SQLiteDatabase.openOrCreateDatabase) {
    SQLiteDatabase.openOrCreateDatabase.overloads[1].implementation = function(file, factory, errorHandler) {
      if (file) {
        //console.log("SQLiteDatabase.openOrCreateDatabase dbPath: " + file.toString());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'SQLiteDatabase';
        send_data.lib = 'android.database.sqlite.SQLiteDatabase';
        send_data.method = 'openOrCreateDatabase';
        send_data.trace = trace();
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "DB Path";
        data.value = file ? file.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
        send(JSON.stringify(send_data));
      }
      return this.openOrCreateDatabase.overloads[1].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#openOrCreateDatabase(java.lang.String, android.database.sqlite.SQLiteDatabase.CursorFactory)
  if (SQLiteDatabase.openOrCreateDatabase) {


    SQLiteDatabase.openOrCreateDatabase.overloads[2].implementation = function(path, factory) {
      //console.log("SQLiteDatabase.openOrCreateDatabase dbPath: " + path);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'openOrCreateDatabase';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DB Path";
      data.value = path ? path.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.openOrCreateDatabase.overloads[2].apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#query(boolean, java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String, java.lang.String)
  if (SQLiteDatabase.query) {
    SQLiteDatabase.query.overloads[0].implementation = function(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit) {

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'query';
      send_data.trace = trace();
      send_data.artifact = [];

      //console.log("SQLiteDatabase.query distinct: " + distinct);
      //console.log("SQLiteDatabase.query table: " + table);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DISTINCT";
      data.value = distinct ? distinct.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (columns) {
        //console.log("SQLiteDatabase.query columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query selection: " + selection);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (selectionArgs) {
        //console.log("SQLiteDatabase.query selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "selection Arguments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query groupBy: " + groupBy);
      //console.log("SQLiteDatabase.query having: " + having);
      //console.log("SQLiteDatabase.query orderBy: " + orderBy);
      //console.log("SQLiteDatabase.query limit: " + limit);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy ? groupBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Limit";
      data.value = limit ? limit.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.query.overloads[0].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";
      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#query(java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String, java.lang.String)
  if (SQLiteDatabase.query) {
    SQLiteDatabase.query.overloads[1].implementation = function(table, columns, selection, selectionArgs, groupBy, having, orderBy, limit) {
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'query';
      send_data.trace = trace();
      send_data.artifact = [];

      //console.log("SQLiteDatabase.query table: " + table);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (columns) {
        //console.log("SQLiteDatabase.query columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query selection: " + selection);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (selectionArgs) {
        //console.log("SQLiteDatabase.query selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Arguments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query groupBy: " + groupBy);
      //console.log("SQLiteDatabase.query having: " + having);
      //console.log("SQLiteDatabase.query orderBy: " + orderBy);
      //console.log("SQLiteDatabase.query limit: " + limit);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy ? groupBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Limit";
      data.value = limit ? limit.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.query.overloads[1].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";
      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");

          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#query(boolean, java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String, java.lang.String, android.os.CancellationSignal)
  if (SQLiteDatabase.query) {
    SQLiteDatabase.query.overloads[2].implementation = function(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal) {
      //console.log("SQLiteDatabase.query distinct: " + distinct);
      //console.log("SQLiteDatabase.query table: " + table);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'query';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DISTINCT";
      data.value = distinct ? distinct.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);


      if (columns) {
        //console.log("SQLiteDatabase.query columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query selection: " + selection);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (selectionArgs) {
        //console.log("SQLiteDatabase.query selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Arguments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query groupBy: " + groupBy);
      //console.log("SQLiteDatabase.query having: " + having);
      //console.log("SQLiteDatabase.query orderBy: " + orderBy);
      //console.log("SQLiteDatabase.query limit: " + limit);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy ? groupBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Limit";
      data.value = limit ? limit.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.query.overloads[2].apply(this, arguments);
      var CursorCopy = Cursor;

      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i)));
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#query(java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String)
  if (SQLiteDatabase.query) {
    SQLiteDatabase.query.overloads[3].implementation = function(table, columns, selection, selectionArgs, groupBy, having, orderBy) {
      //console.log("SQLiteDatabase.query table: " + table);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'query';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (columns) {
        //console.log("SQLiteDatabase.query columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.query selection: " + selection);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (selectionArgs) {
        //console.log("SQLiteDatabase.query selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Arguments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

      }
      //console.log("SQLiteDatabase.query groupBy: " + groupBy);
      //console.log("SQLiteDatabase.query having: " + having);
      //console.log("SQLiteDatabase.query orderBy: " + orderBy);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy.toString();
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.query.overloads[3].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob;

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#queryWithFactory(android.database.sqlite.SQLiteDatabase.CursorFactory, boolean, java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String, java.lang.String, android.os.CancellationSignal)
  if (SQLiteDatabase.queryWithFactory) {
    SQLiteDatabase.queryWithFactory.overloads[0].implementation = function(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal) {
      //console.log("SQLiteDatabase.queryWithFactory table: " + table);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'queryWithFactory';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (columns) {
        //console.log("SQLiteDatabase.queryWithFactory columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.queryWithFactory selection: " + selection);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (selectionArgs) {
        //console.log("SQLiteDatabase.queryWithFactory selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Arguments";
        data.value = selection ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.queryWithFactory groupBy: " + groupBy);
      //console.log("SQLiteDatabase.queryWithFactory having: " + having);
      //console.log("SQLiteDatabase.queryWithFactory orderBy: " + orderBy);
      //console.log("SQLiteDatabase.queryWithFactory limit: " + limit);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy ? groupBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Limit";
      data.value = limit ? limit.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);


      var Cursor = this.queryWithFactory.overloads[0].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#queryWithFactory(android.database.sqlite.SQLiteDatabase.CursorFactory, boolean, java.lang.String, java.lang.String[], java.lang.String, java.lang.String[], java.lang.String, java.lang.String, java.lang.String, java.lang.String, android.os.CancellationSignal)
  if (SQLiteDatabase.queryWithFactory) {
    SQLiteDatabase.queryWithFactory.overloads[1].implementation = function(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit) {
      //console.log("SQLiteDatabase.queryWithFactory table: " + table);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'queryWithFactory';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);


      if (columns) {
        //console.log("SQLiteDatabase.queryWithFactory columns: " + columns.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Columns";
        data.value = columns ? columns.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.queryWithFactory selection: " + selection);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Selection";
      data.value = selection ? selection.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (selectionArgs) {
        //console.log("SQLiteDatabase.queryWithFactory selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Arguments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.queryWithFactory groupBy: " + groupBy);
      //console.log("SQLiteDatabase.queryWithFactory having: " + having);
      //console.log("SQLiteDatabase.queryWithFactory orderBy: " + orderBy);
      //console.log("SQLiteDatabase.queryWithFactory limit: " + limit);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Group By";
      data.value = groupBy ? groupBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Having";
      data.value = having ? having.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Order By";
      data.value = orderBy ? orderBy.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Limit";
      data.value = limit ? limit.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.queryWithFactory.overloads[1].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));

            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";

            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";

              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#rawQuery(java.lang.String, java.lang.String[], android.os.CancellationSignal)
  if (SQLiteDatabase.rawQuery) {
    SQLiteDatabase.rawQuery.overloads[0].implementation = function(sql, selectionArgs, cancellationSignal) {
      //console.log("SQLiteDatabase.rawQuery sql: " + sql);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'rawQuery';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (selectionArgs) {
        //console.log("SQLiteDatabase.rawQuery selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Argruments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }

      var Cursor = this.rawQuery.overloads[0].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#rawQuery(java.lang.String, java.lang.String[])
  if (SQLiteDatabase.rawQuery) {

    SQLiteDatabase.rawQuery.overloads[1].implementation = function(sql, selectionArgs) {
      //console.log("SQLiteDatabase.rawQuery sql: " + sql);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'rawQuery';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (selectionArgs) {
        //console.log("SQLiteDatabase.rawQuery selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Argruments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      var Cursor = this.rawQuery.overloads[1].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";

      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#rawQueryWithFactory(android.database.sqlite.SQLiteDatabase.CursorFactory, java.lang.String, java.lang.String[], java.lang.String, android.os.CancellationSignal)
  if (SQLiteDatabase.rawQueryWithFactory) {
    SQLiteDatabase.rawQueryWithFactory.overloads[0].implementation = function(cursorFactory, sql, selectionArgs, editTable, cancellationSignal) {
      //console.log("SQLiteDatabase.rawQueryWithFactory sql: " + sql);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'rawQueryWithFactory';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (selectionArgs) {
        //console.log("SQLiteDatabase.rawQueryWithFactory selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Argruments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.rawQueryWithFactory editTable: " + editTable);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Edit Table";
      data.value = editTable ? editTable.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      var Cursor = this.rawQueryWithFactory.overloads[0].apply(this, arguments);
      var CursorCopy = Cursor;

      var queryOutput = "";
      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#rawQueryWithFactory(android.database.sqlite.SQLiteDatabase.CursorFactory, java.lang.String, java.lang.String[], java.lang.String)
  if (SQLiteDatabase.rawQueryWithFactory) {
    SQLiteDatabase.rawQueryWithFactory.overloads[1].implementation = function(cursorFactory, sql, selectionArgs, editTable) {
      //console.log("SQLiteDatabase.rawQueryWithFactory sql: " + sql);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'rawQueryWithFactory';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (selectionArgs) {
        //console.log("SQLiteDatabase.rawQueryWithFactory selectionArgs: " + selectionArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "Selection Argruments";
        data.value = selectionArgs ? selectionArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      //console.log("SQLiteDatabase.rawQueryWithFactory editTable: " + editTable);
      /*   --- Payload Body --- */
      var data = {};
      data.name = "Edit Table";
      data.value = editTable ? editTable.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      var Cursor = this.rawQueryWithFactory.overloads[1].apply(this, arguments);
      var CursorCopy = Cursor;
      var queryOutput = "";
      if (Cursor && Cursor.getColumnCount && Cursor.moveToFirst()) {
        var ColumnCount = parseInt(Cursor.getColumnCount());
        if (ColumnCount > 0) {
          //console.log("Returned Columns");
          for (var i = 0; i < ColumnCount; i++) {
            ////console.log("DEBUG: " + i);
            //console.log("ColumnName: " + Cursor.getColumnName(i));
            ////console.log("ColumnData: " + Cursor.getColumnIndex(Cursor.getColumnName(i)));
            queryOutput += "ColumnName: " + Cursor.getColumnName(i) + "\n";
            if (!Cursor.isNull(i)) {
              try {
                //console.log("ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))));
                queryOutput += "ColumnData: " + Cursor.getString(Cursor.getColumnIndex(Cursor.getColumnName(i))) + "\n";
              } catch (e) {
                var blob = Cursor.getBlob(Cursor.getColumnIndex(Cursor.getColumnName(i)));
                var strBlob = normalize(blob);
                //console.log("ColumnData: " + strBlob);
                queryOutput += "ColumnData: " + strBlob + "\n";

                /*   --- Payload Body --- */
                var data = {};
                data.name = "Returned Columns";
                data.value = queryOutput;
                data.argSeq = 0;
                send_data.artifact.push(data);
              }
            }
          }
        }
      }
      send(JSON.stringify(send_data));
      return CursorCopy;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#update(java.lang.String, android.content.ContentValues, java.lang.String, java.lang.String[])
  if (SQLiteDatabase.update) {
    SQLiteDatabase.update.implementation = function(table, values, whereClause, whereArgs) {
      //console.log("SQLiteDatabase.update table: " + table);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'update';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (values) {
        //console.log("SQLiteDatabase.update values: " + values.toString());

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Values";
        data.value = values ? values.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

      }
      //console.log("SQLiteDatabase.update whereClause: " + whereClause);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "WHERE Clause";
      data.value = whereClause ? whereClause.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (whereArgs) {
        //console.log("SQLiteDatabase.update whereArgs: " + whereArgs.toString());
        /*   --- Payload Body --- */
        var data = {};
        data.name = "WHERE Arguments";
        data.value = whereArgs ? whereArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);
      }
      send(JSON.stringify(send_data));
      return this.update.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#updateWithOnConflict(java.lang.String, android.content.ContentValues, java.lang.String, java.lang.String[], int)
  if (SQLiteDatabase.updateWithOnConflict) {
    SQLiteDatabase.updateWithOnConflict.implementation = function(table, values, whereClause, whereArgs, conflictAlgorithm) {
      //console.log("SQLiteDatabase.updateWithOnConflict table: " + table);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'updateWithOnConflict';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Table";
      data.value = table ? table.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);
      if (values) {
        //console.log("SQLiteDatabase.updateWithOnConflict values: " + values.toString());

        /*   --- Payload Body --- */
        var data = {};
        data.name = "Values";
        data.value = values ? values.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

      }
      //console.log("SQLiteDatabase.updateWithOnConflict whereClause: " + whereClause);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "WHERE Clause";
      data.value = whereClause ? whereClause.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      if (whereArgs) {
        //console.log("SQLiteDatabase.updateWithOnConflict whereArgs: " + whereArgs.toString());

        /*   --- Payload Body --- */
        var data = {};
        data.name = "WHERE Arguments";
        data.value = whereArgs ? whereArgs.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

      }
      //console.log("SQLiteDatabase.updateWithOnConflict conflictAlgorithm: " + conflictAlgorithm);

      /*   --- Payload Body --- */
      var data = {};
      data.name = "Conflict Algorithm";
      data.value = conflictAlgorithm ? conflictAlgorithm.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return this.updateWithOnConflict.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#validateSql(java.lang.String, android.os.CancellationSignal)
  if (SQLiteDatabase.validateSql) {
    SQLiteDatabase.validateSql.implementation = function(sql, cancellationSignal) {
      //console.log("SQLiteDatabase.validateSql SQL: " + sql);
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'validateSql';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));

      return this.validateSql.apply(this, arguments);
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#compileStatement(java.lang.String)
  if (SQLiteDatabase.compileStatement) {
    SQLiteDatabase.compileStatement.implementation = function(sql) {
      //console.log("SQLiteDatabase.compileStatement SQL: " + sql);

      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'compileStatement';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "SQL Statement";
      data.value = sql ? sql.toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));

      return this.compileStatement.apply(this, arguments);
    }
  }

  //Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#create(android.database.sqlite.SQLiteDatabase.CursorFactory)
  if (SQLiteDatabase.create) {
    SQLiteDatabase.create.implementation = function(factory) {
      var db = this.create.apply(this, arguments);
      //console.log("SQLiteDatabase.create DB: " + db.getPath());
      /*   --- Payload Header --- */
      var send_data = {};
      send_data.time = new Date();
      send_data.txnType = 'SQLiteDatabase';
      send_data.lib = 'android.database.sqlite.SQLiteDatabase';
      send_data.method = 'create';
      send_data.trace = trace();
      send_data.artifact = [];

      /*   --- Payload Body --- */
      var data = {};
      data.name = "DB Path";
      data.value = db.getPath() ? db.getPath().toString() : 'null';
      data.argSeq = 0;
      send_data.artifact.push(data);

      send(JSON.stringify(send_data));
      return db;
    }
  }

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#delete(java.lang.String, java.lang.String, java.lang.String[])
  /*
  if (SQLiteDatabase.delete) {
    SQLiteDatabase.delete.implementation = function(table, whereClause, whereArgs) {
      //console.log("SQLiteDatabase.updateWithOnConflict table: " + table);
      //console.log("SQLiteDatabase.updateWithOnConflict whereClause: " + whereClause);
      if (whereArgs) {
        //console.log("SQLiteDatabase.updateWithOnConflict whereArgs: " + whereArgs.toString());
      }
      return this.delete.apply(this, arguments);
    }
  }
  */

  // Ref: https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html#deleteDatabase(java.io.File)
  if (SQLiteDatabase.deleteDatabase) {
    SQLiteDatabase.deleteDatabase.implementation = function(file) {
      if (file) {
        //console.log("SQLiteDatabase.deleteDatabase File: " + file.toString());
        /*   --- Payload Header --- */
        var send_data = {};
        send_data.time = new Date();
        send_data.txnType = 'SQLiteDatabase';
        send_data.lib = 'android.database.sqlite.SQLiteDatabase';
        send_data.method = 'deleteDatabase';
        send_data.trace = trace();
        send_data.artifact = [];

        /*   --- Payload Body --- */
        var data = {};
        data.name = "DB Path";
        data.value = file ? file.toString() : 'null';
        data.argSeq = 0;
        send_data.artifact.push(data);

        send(JSON.stringify(send_data));
      }
      return this.deleteDatabase.apply(this, file);
    }
  }
});