'use strict';
/*jslint browser: true*/
var EncryptedItem = function EncryptedItem(key, class_name, clear_obj) {
    var cypher_obj = key.encrypt({cn: class_name, obj: clear_obj});
    clear_obj = null;

    this.toJSON = function toJSON() {
        return {
            key: key,
            enc: cypher_obj
        };
    };

    this.read = function read() {
        return key.read(cypher_obj);
    };

    this.write = function write(new_clear_obj) {
        clear_obj = key.read(cypher_obj);
        if (!clear_obj) {
            return false;
        }

        var BaseObject = window[clear_obj.cn];
        if (!BaseObject) {
            console.log('invald class name', clear_obj.cn);
            clear_obj = null;
            return false;
        }
        clear_obj = null;
        cypher_obj = key.encrypt({cn: class_name, obj: new_clear_obj});
    };
};
