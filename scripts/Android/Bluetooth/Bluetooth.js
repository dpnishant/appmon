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

Java.perform(function(argument) {
  var Context = Java.use("android.content.Context");
  var BluetoothGatt = Java.use("android.bluetooth.BluetoothGatt");
  var BluetoothGattCharacteristic = Java.use("android.bluetooth.BluetoothGattCharacteristic");
  
  BluetoothGatt.readCharacteristic.overload("android.bluetooth.BluetoothGattCharacteristic").implementation = function(characteristic) {
    //console.log("characteristic: ", characteristic.getUuid(), " readCharacteristic: ", characteristic.getValue());
    /*   --- Payload Header --- */
    var send_data = {};
    send_data.time = new Date();
    send_data.txnType = 'Bluetooth';
    send_data.lib = 'android.bluetooth.BluetoothGatt';
    send_data.method = 'readCharacteristic';
    send_data.trace = trace();
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
    send_data.trace = trace();
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