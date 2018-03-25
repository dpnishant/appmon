
'use strict';

var Log = null;
var Exception = null;

Java.perform(function () {
    Log = Java.use("android.util.Log");
    Exception = Java.use("java.lang.Exception");
    }
);

function trace() {
    if(Java.available){
        try {
            throw Exception.$new("Trace");
        } catch (e) {
            ret = (Log.getStackTraceString(e));
        }
    }else{
        var ret = "iOs not supported yet!";
    }
    return ret;
};