



'use strict';
Java.perform(function(argument) {
  var Context = Java.use("android.content.Context");

    var BluetoothGatt = Dalvik.use("android.bluetooth.BluetoothGatt");
    BluetoothGatt.readCharacteristic.overload('android.bluetooth.BluetoothGattCharacteristic').implementation = function(characteristic) {
      console.log("characteristic: ", characteristic.getUuid(), " readCharacteristic: ", characteristic.getValue());
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
      return this.readCharacteristic(characteristic);
    };
    // BluetoothGatt.writeCharacteristic.overload('android.bluetooth.BluetoothGattCharacteristic').implementation = function(characteristic) {
    //   console.log("characteristic: ", characteristic.getUuid(), " writeCharacteristic: ", characteristic.getValue());
    //   return this.writeCharacteristic(characteristic);
    // };

    var BluetoothGattCharacteristic = Dalvik.use("android.bluetooth.BluetoothGattCharacteristic");
    // BluetoothGattCharacteristic.setValue.overload("java.lang.String").implementation = function(value) {
    //   console.log("characteristic: ", this.getUuid(), " setValue java.lang.String: ", value);
    //   return this.setValue(value);
    // };
    BluetoothGattCharacteristic.setValue.overload("[B").implementation = function(value) {
      console.log("characteristic: ", this.getUuid(), " setValue [B: ", value);
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
      return this.setValue(value);
    };
    // BluetoothGattCharacteristic.setValue.overload("int", "int", "int").implementation = function(value, formatType, offset) {
    //   console.log("characteristic: ", this.getUuid(), " setValue 3i: ", value);
    //   return this.setValue(value, formatType, offset);
    // };
    // BluetoothGattCharacteristic.setValue.overload("int", "int", "int", "int").implementation = function(mantissa, exponent, formatType, offset) {
    //   console.log("characteristic: ", this.getUuid(), " setValue 4i: ", value);
    //   return this.setValue(mantissa, exponent, formatType, offset);
    // };
    // BluetoothGattCharacteristic.getFloatValue.overload("int", "int").implementation = function(formatType, offset) {
    //   var value = this.getValue(formatType, offset);
    //   console.log("characteristic: ", this.getUuid(), " getFloatValue: ", value);
    //   return value;
    // };
    // BluetoothGattCharacteristic.getIntValue.overload("int", "int").implementation = function(formatType, offset) {
    //   var value = this.getValue(formatType, offset);
    //   console.log("characteristic: ", this.getUuid(), " getIntValue: ", value);
    //   return value;
    // };
    // BluetoothGattCharacteristic.getStringValue.overload("int").implementation = function(offset) {
    //   var value = this.getValue(offset);
    //   console.log("characteristic: ", this.getUuid(), " getStringValue: ", value);
    //   return value;
    // };
    // BluetoothGattCharacteristic.getValue.overload().implementation = function() {
    //   var value = this.getValue();
    //   console.log("characteristic: ", this.getUuid(), " getValue: ", value);
    //   return value;
    // };
});