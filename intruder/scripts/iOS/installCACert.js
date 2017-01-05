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

var MCProfileServicer = ObjC.classes.MCProfileServicer;
var NSString = ObjC.classes.NSString;
var MCInstaller = ObjC.classes.MCInstaller;
var NSInlineData = ObjC.classes._NSInlineData;

var NSUTF8StringEncoding = 4;

/* BurpSuite CA Cert PEM Encoded */
var data = '-----BEGIN CERTIFICATE-----MIIDyTCCArGgAwIBAgIEV6ybBzANBgkqhkiG9w0BAQsFADCBijEUMBIGA1UEBhMLUG9ydFN3aWdnZXIxFDASBgNVBAgTC1BvcnRTd2lnZ2VyMRQwEgYDVQQHEwtQb3J0U3dpZ2dlcjEUMBIGA1UEChMLUG9ydFN3aWdnZXIxFzAVBgNVBAsTDlBvcnRTd2lnZ2VyIENBMRcwFQYDVQQDEw5Qb3J0U3dpZ2dlciBDQTAeFw0xNjA4MTExNTM0MzFaFw0zNjA4MDYxNTM0MzFaMIGKMRQwEgYDVQQGEwtQb3J0U3dpZ2dlcjEUMBIGA1UECBMLUG9ydFN3aWdnZXIxFDASBgNVBAcTC1BvcnRTd2lnZ2VyMRQwEgYDVQQKEwtQb3J0U3dpZ2dlcjEXMBUGA1UECxMOUG9ydFN3aWdnZXIgQ0ExFzAVBgNVBAMTDlBvcnRTd2lnZ2VyIENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAopk76/Veph4j+/dAjgCqt32+8POnMVXqmJEjhm42zR0naS+sfCa7G8KPU//pAMWkic8YWRgnS7fW8jdZSw0NSvFlR1Uk+tMEPYLmmZ9vsu2vGNRh4p24ptPeJLsK2/dzfll9HWeD35pO9vdIemKHqydCGqy0d3r7+pzGv6mrpbXEDiOA5mLHoTLYYwEhCXb4WohNJfTFAuhUvvUOqloiNwIr5r631nYFst0pzWsWuIGBcbHKCL6K/BDFI7eRd8ZGPdqS82mC9ZrtbjzwCL1U8PYK89Ovdkkr3NXnYXUpba22o+xdU/gsLXDLi4uf/1ybv08r2iJSDkXh5nIR0YAeMwIDAQABozUwMzASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBQCgp0o/WYyCeCNcA5SJe9XfrYeQjANBgkqhkiG9w0BAQsFAAOCAQEAe49iPU8tXVcust5oWfXJoDYBsLD2F2Hp29kSNmqIp3VqHi0bl1HOS1ZSjXRDJp3EGE/wNfW0I8pkmuM3uh1tPvdCpaQFCDTSyFIBMATPyzKX+uU4p5l4/cx4sHxF4t7Zza+XMXmOwllv1D1gceHLshSUW7Lxc51WS//9zcBsBapcmV7s5upR34daKN0UIpBGUml4tyChwveoTiRQ23Ye0eXmUeBrruQgbbEqNb/cPDoj91komfWbd2fan8O7ogZ+e1FvarINwEV7vEGzGyr50QM8A88JUDBdWPQqHVFZ9rhr82rjD70pFAI+GxEr2YQn6+XMBGGHJRAjeiXv8oOtwg==-----END CERTIFICATE-----';

var progress = {'status': 'start'};

send(JSON.stringify(progress))

var installer = MCInstaller.sharedInstaller();
var profile = NSString.stringWithString_(data).dataUsingEncoding_(NSUTF8StringEncoding);
installer.installProfileData_options_interactionClient_outError_(profile, NULL, NULL, NULL);

progress.status = 'end';

send(JSON.stringify(progress))