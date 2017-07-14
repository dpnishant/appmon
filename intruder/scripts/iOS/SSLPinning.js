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
var resolver = new ApiResolver('objc');
var NSURLCredential = ObjC.classes.NSURLCredential;

// Ref: https://developer.apple.com/documentation/security/1399173-sslsetsessionoption?preferredLanguage=occ
var SSLSetSessionOption = new NativeFunction(Module.findExportByName('Security', 'SSLSetSessionOption'), 'int', ['pointer', 'int', 'bool']);

// for iOS verion 10 and higher
// Ref: https://opensource.apple.com/source/coreTLS/coreTLS-121.1.1/coretls_cfhelpers/tls_helpers.c
var tls_helper_create_peer_trust = new NativeFunction(Module.findExportByName('libcoretls_cfhelpers.dylib', 'tls_helper_create_peer_trust'), 'int', ['void', 'bool', 'pointer']);

// Ref: https://developer.apple.com/documentation/security/1393063-sslcreatecontext
var SSLCreateContext = new NativeFunction(Module.findExportByName('Security', 'SSLCreateContext'), 'pointer', ['pointer', 'int', 'int']);


// for iOS version 9 and lower
// Ref: https://developer.apple.com/documentation/security/1400161-sslhandshake?language=objc#parameters
// Ref: https://developer.apple.com/documentation/security/secure_transport/1503828-secure_transport_result_codes/errsslserverauthcompleted?language=objc
var errSSLServerAuthCompleted = -9481;
var kSSLSessionOptionBreakOnServerAuth = 0;
var noErr = 0;
var errSecSuccess = 0;
var SSLHandshake = new NativeFunction(Module.findExportByName('Security', 'SSLHandshake'), 'int', ['pointer']);


// Ref: https://developer.apple.com/documentation/security/1394363-sectrustevaluate
var kSecTrustResultInvalid = 0;
var kSecTrustResultProceed = 1;
var kSecTrustResultDeny = 3;
var kSecTrustResultUnspecified = 4;
var kSecTrustResultRecoverableTrustFailure = 6;
var kSecTrustResultFatalTrustFailure = 6;
var kSecTrustResultOtherError = 7;
var SecTrustEvaluate = new NativeFunction(Module.findExportByName("Security", "SecTrustEvaluate"), 'int', ['pointer', 'pointer']);

// AFNetworking 3.0
// Ref: http://cocoadocs.org/docsets/AFNetworking/3.0.0/Classes/AFSecurityPolicy.html#//api/name/policyWithPinningMode:
try {
    Interceptor.attach(ObjC.classes.AFSecurityPolicy['+ policyWithPinningMode:'].implementation, {
        onEnter: function(args) {
            var int_0 = new NativePointer('0x0');
            if (args[2] != int_0) {
                console.log('[+] Executing SSL Pinning Bypass Technique #1');
                args[2] = int_0;
            }
        }
    });

} catch (e) {
    console.log('[-] ', e.stack);
}


// Ref: http://cocoadocs.org/docsets/AFNetworking/3.0.0/Classes/AFSecurityPolicy.html#//api/name/policyWithPinningMode:withPinnedCertificates:
try {
    Interceptor.attach(ObjC.classes.AFSecurityPolicy['+ policyWithPinningMode:withPinnedCertificates:'].implementation, {
        onEnter: function(args) {
            var int_0 = new NativePointer('0x0');
            if (args[2] != int_0) {
                console.log('[+] Executing SSL Pinning Bypass Technique #2');
                args[2] = int_0;
            }
        }
    });
} catch (e) {
    console.log('[-] ', e.stack);
}


// Ref: https://developer.apple.com/documentation/foundation/nsurlsessiondelegate/1409308-urlsession
try {
    resolver.enumerateMatches('-[* URLSession:didReceiveChallenge:completionHandler:]', {
        onMatch: function(match) {
            console.log('[+] [NSURLSession] Found URLSession:didReceiveChallenge:completionHandler:');
            Interceptor.attach(match.address, {
                onEnter: function(args) {

                    var receiver = new ObjC.Object(args[0]);
                    var selector = ObjC.selectorAsString(args[1]);
                    var session = new ObjC.Object(args[2]);
                    var challenge = new ObjC.Object(args[3]);

                    console.log('[+] Executing SSL Pinning Bypass Technique #3');

                    var completion_handler = new ObjC.Block(args[4]);
                    var saved_completion_handler = completion_handler.implementation;

                    completion_handler.implementation = function() {

                        // Ref: https://developer.apple.com/documentation/foundation/nsurlcredential/1407330-credentialfortrust
                        var credential = NSURLCredential.credentialForTrust_(challenge.protectionSpace().serverTrust());

                        // Ref: https://developer.apple.com/documentation/foundation/nsurlauthenticationchallengesender/1411062-usecredential
                        challenge.sender().useCredential_forAuthenticationChallenge_(credential, challenge);
                        saved_completion_handler(0, credential);
                    }
                }
            });
        },
        onComplete: function() {}
    });
} catch (e) {
    console.log('[-] ', e.stack);
}


// Ref: https://developer.apple.com/documentation/foundation/nsurlconnectiondelegate/1414078-connection?language=objc
try {
    resolver.enumerateMatches('-[* connection:willSendRequestForAuthenticationChallenge:]', {
        onMatch: function(match) {
            console.log('[+] Executing SSL Pinning Bypass Technique #4');
            Interceptor.replace(match.address, new NativeCallback(function(a, b, connection, challenge) {
                // console.log('[+] swizzled');
            }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']));
        },
        onComplete: function() {}
    });
} catch (e) {
    console.log('[-] ', e.stack);
}


// (as done in SSL-Killswitch2)
// Ref: https://github.com/nabla-c0d3/ssl-kill-switch2/blob/master/SSLKillSwitch/SSLKillSwitch.m
try {
    Interceptor.replace(SecTrustEvaluate, new NativeCallback(function(trust, result) {
        console.log('[+] Executing SSL Pinning Bypass Technique #5');
        var ret = SecTrustEvaluate(trust, result);
        result = kSecTrustResultProceed;
        return ret;
    }, 'int', ['pointer', 'pointer']));
} catch (e) {
    console.log('[-] ', e.stack);
}


try {
    Interceptor.replace(SSLSetSessionOption, new NativeCallback(function(context, option, value) {
        console.log('[+] Executing SSL Pinning Bypass Technique #6');
        if (option === kSSLSessionOptionBreakOnServerAuth) {
            return noErr;
        }
        return SSLSetSessionOption(context, option, value);
    }, 'int', ['pointer', 'int', 'bool']));
} catch (e) {
    console.log('[-] ', e.stack);
}



try {
    Interceptor.replace(SSLCreateContext, new NativeCallback(function(alloc, protocolSide, connectionType) {
        console.log('[+] Executing SSL Pinning Bypass Technique #7');
        var sslContext = SSLCreateContext(alloc, protocolSide, connectionType);
        SSLSetSessionOption(sslContext, kSSLSessionOptionBreakOnServerAuth, 1);
        return sslContext;
    }, 'pointer', ['pointer', 'int', 'int']));
} catch (e) {
    console.log('[-] ', e.stack);
}


try {
    Interceptor.replace(SSLHandshake, new NativeCallback(function(context) {
        console.log('[+] Executing SSL Pinning Bypass Technique #8');
        var result = SSLHandshake(context);
        if (result === errSSLServerAuthCompleted) {
            return SSLHandshake(context);
        } else {
            return result;
        }
    }, 'int', ['pointer']));
} catch (e) {
    console.log('[-] ', e.stack);
}


try {
    Interceptor.replace(tls_helper_create_peer_trust, new NativeCallback(function(hdsk, server, SecTrustRef) {
        console.log('[+] Executing SSL Pinning Bypass Technique #9');
        return errSecSuccess;
    }, 'int', ['void', 'bool', 'pointer']));
} catch (e) {
    console.log('[-] ', e.stack);
}