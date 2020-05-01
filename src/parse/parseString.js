"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(value) {
    var lastChar = value[value.length - 1];
    var firstChar = value[0];
    if (firstChar == '"' && lastChar == '"') {
        return value.substring(1, value.length - 1);
    }
    else {
        return value;
    }
}
exports.default = default_1;
