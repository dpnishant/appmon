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

var NSMutableDictionary = ObjC.classes.NSMutableDictionary;
var SecItemDelete_function = new NativeFunction(ptr(Module.findExportByName('Security', 'SecItemDelete')), 'pointer', ['pointer']);
var dict = NSMutableDictionary.alloc().init();

// Keychain item types to be queried e.g. kSecClassKey, kSecClassIdentity, kSecClassCertificate, kSecClassGenericPassword, kSecClassInternetPassword
var classes = ['class', 'keys', 'idnt', 'cert', 'genp', 'inet'];

try {
    for (item_class_index in classes) {
        var item_class = classes[item_class_index];
        dict.setObject_forKey_(item_class, kSecClass); // set the class-type of the item being queried 
        SecItemDelete_function(dict); // delete the class's items.
    }
} catch (e) {
    console.log(e.stack);
}
console.log('[+] Keychain cleared!');