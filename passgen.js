'use strict';
/*global $*/
var genNewPassword;
(function () {
    var capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var lowers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '[', ']', '{', '}', '|', ';', ':', '"', '\'', ',', '.', '<', '>', '/', '?'];

    var shuffle = function (arr) {
        var i = arr.length;
        var j;
        var temp;
        if (i === 0) {
            return false;
        }
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    };

    genNewPassword = function () {
        var allowed_characters = capitals.slice().concat(lowers, numbers, symbols);
        var password = '';
        var i;
        for (i = 0; i < 12; i++) {
            shuffle(allowed_characters);
            password += allowed_characters[0];
        }
        $('#box').append($('<div>').text(password));
    };
}());
