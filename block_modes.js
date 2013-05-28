'use strict';

var xor = function (block1, block2) {
    /*jslint bitwise: true*/
    var len = block1.length;
    var block = [];
    var i;
    for (i = 0; i < len; i++) {
        block.push(block1[i] ^ block2[i]);
    }
    return block;
};

var ECB = (function () {
    var encrypt = function (encryptor, key, plaintext) {
        var kl = key.length;
        var pad = (kl - (plaintext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            plaintext.push(0);
        }

        var cyphertext = [];
        for (i = 0; i < plaintext.length; i += kl) {
            cyphertext = cyphertext.concat(encryptor(plaintext.slice(i, i + kl), key));
        }
        cyphertext.length -= pad;
        return cyphertext;
    };

    var decrypt = function (decryptor, key, cyphertext) {
        var kl = key.length;
        var pad = (kl - (cyphertext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            cyphertext.push(0);
        }

        var plaintext = [];
        for (i = 0; i < cyphertext.length; i += kl) {
            plaintext = plaintext.concat(decryptor(cyphertext.slice(i, i + kl), key));
        }
        plaintext.length -= pad;
        return plaintext;
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
}());

var CBC = (function () {
    var encrypt = function (encryptor, key, plaintext, iv) {
        var kl = key.length;
        var pad = (kl - (plaintext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            plaintext.push(0);
        }

        var cyphertext = [];
        var block;
        for (i = 0; i < plaintext.length; i += kl) {
            block = xor(plaintext.slice(i, i + kl), iv);
            iv = encryptor(block, key);
            cyphertext = cyphertext.concat(iv);
        }
        cyphertext.length -= pad;
        return cyphertext;
    };

    var decrypt = function (decryptor, key, cyphertext, iv) {
        var kl = key.length;
        var pad = (kl - (cyphertext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            cyphertext.push(0);
        }

        var plaintext = [];
        var block;
        for (i = 0; i < cyphertext.length; i += kl) {
            block = cyphertext.slice(i, i + kl);
            plaintext = plaintext.concat(xor(iv, decryptor(block, key)));
            iv = block;
        }
        plaintext.length -= pad;
        return plaintext;
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
}());

var PCBC = (function () {
    var encrypt = function (encryptor, key, plaintext, iv) {
        var kl = key.length;
        var pad = (kl - (plaintext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            plaintext.push(0);
        }

        var cyphertext = [];
        var block;
        for (i = 0; i < plaintext.length; i += kl) {
            block = plaintext.slice(i, i + kl);
            iv = encryptor(xor(iv, block), key);
            cyphertext = cyphertext.concat(iv);
            iv = xor(iv, block);
        }
        cyphertext.length -= pad;
        return cyphertext;
    };

    var decrypt = function (decryptor, key, cyphertext, iv) {
        var kl = key.length;
        var pad = (kl - (cyphertext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            cyphertext.push(0);
        }

        var plaintext = [];
        var cy_block;
        var block;
        for (i = 0; i < cyphertext.length; i += kl) {
            cy_block = cyphertext.slice(i, i + kl);
            block = xor(iv, decryptor(cy_block, key));
            plaintext = plaintext.concat(block);
            iv = xor(block, cy_block);
        }
        plaintext.length -= pad;
        return plaintext;
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
}());

var CFB = (function () {
    var encrypt = function (encryptor, key, plaintext, iv) {
        var kl = key.length;
        var pad = (kl - (plaintext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            plaintext.push(0);
        }

        var cyphertext = [];
        var block;
        for (i = 0; i < plaintext.length; i += kl) {
            block = xor(plaintext.slice(i, i + kl), encryptor(iv, key));
            cyphertext = cyphertext.concat(block);
            iv = block;
        }
        cyphertext.length -= pad;
        return cyphertext;
    };

    var decrypt = function (encryptor, key, cyphertext, iv) {
        var kl = key.length;
        var pad = (kl - (cyphertext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            cyphertext.push(0);
        }

        var plaintext = [];
        var block;
        for (i = 0; i < cyphertext.length; i += kl) {
            block = cyphertext.slice(i, i + kl);
            plaintext = plaintext.concat(xor(block, encryptor(iv, key)));
            iv = block;
        }
        plaintext.length -= pad;
        return plaintext;
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    };
}());

var OFB = (function () {
    var encrypt = function (encryptor, key, plaintext, iv) {
        var kl = key.length;
        var pad = (kl - (plaintext.length % kl)) % kl;
        var i;
        for (i = 0; i < pad; i++) {
            plaintext.push(0);
        }

        var cyphertext = [];
        var block;
        for (i = 0; i < plaintext.length; i += kl) {
            block = encryptor(iv, key);
            cyphertext = cyphertext.concat(xor(block, plaintext.slice(i, i + kl)));
            iv = block;
        }
        cyphertext.length -= pad;
        return cyphertext;
    };

    return {
        encrypt: encrypt,
        decrypt: encrypt
    };
}());

