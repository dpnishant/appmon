'use strict';
Java.perform(function(argument) {
  var Context = Java.use("android.content.Context");
  var BluetoothGatt = Dalvik.use("android.bluetooth.BluetoothGatt");
  var BluetoothGattCharacteristic = Dalvik.use("android.bluetooth.BluetoothGattCharacteristic");
  
  BluetoothGatt.readCharacteristic.overload("android.bluetooth.BluetoothGattCharacteristic").implementation = function(characteristic) {
    //console.log("characteristic: ", characteristic.getUuid(), " readCharacteristic: ", characteristic.getValue());
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Bluetooth';
    send_data.lib = 'android.bluetooth.BluetoothGatt';
    send_data.method = 'readCharacteristic';
    send_data.artifact = [];
    /*   --- Payload Body --- */
    var data = {};
    data.name = characteristic.getUuid().toString();
    data.value = characteristic.getValue().toString();
    data.argSeq = 0;
    send_data.artifact.push(data);
    send(JSON.stringify(send_data));
    return this.readCharacteristic.overload("android.bluetooth.BluetoothGattCharacteristic").apply(this, arguments);
  };

  BluetoothGattCharacteristic.setValue.overload("[B").implementation = function(value) {
    //console.log("characteristic: ", this.getUuid(), " setValue [B: ", value);
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Bluetooth';
    send_data.lib = 'android.bluetooth.BluetoothGattCharacteristic';
    send_data.method = 'setValue';
    send_data.artifact = [];
    /*   --- Payload Body --- */
    var data = {};
    data.name = this.getUuid().toString();
    data.value = value.toString();
    data.argSeq = 0;
    send_data.artifact.push(data);
    send(JSON.stringify(send_data));
    return this.setValue.overload("[B").apply(this, arguments);
  };

});