'use strict';
/*jslint browser: true*/

var EncryptionKey = function EncryptionKey(passphrase) {
    if (!this) {
        return new EncryptionKey(passphrase);
    }
    var timer;
    var clearPassphrase = function clearPassphrase() {
        timer = null;
        passphrase = null;
    };
    timer = setTimeout(clearPassphrase, 30 * 1000);

    this.encrypt = function encrypt(obj) {
        var json = JSON.stringify(obj);

};
