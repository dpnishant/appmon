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

var rooted_blacklist = [
	"/sbin/su",
	"/system/bin/su",
	"/system/bin/failsafe/su",
	"/system/xbin/su",
	"/system/sd/xbin/su",
	"/data/local/su",
	"/data/local/xbin/su",
	"/system/app/Superuser.apk"
];
Java.perform(function () {
	var File = Java.use("java.io.File");
	var Runtime = Java.use("java.lang.Runtime");
	File.exists.implementation = function () {
		if (rooted_blacklist.indexOf(this.path['value']) > -1) {
			console.log("Dropped File Access: " + this.path['value']);
			return false;
		} else {
			return this.exists.call(this);
		}
		
	}
	
	Runtime.getRuntime().exec.overload("java.lang.String").implementation = function(command) {
		if(command.toString() === 'su') {
			console.log("Dropped Command: su");
			return null;
		} else {
			return this.exec.call(this, command);	
		}
	};

});