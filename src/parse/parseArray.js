"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __importDefault(require("./parse"));
function default_1(value) {
    var list = [];
    var context = 'start';
    var scope = 0;
    var tmpVal = undefined;
    var inString = false;
    for (var i = 0; i < value.length; i++) {
        var ch = value[i];
        if (ch === "\"") {
            inString = !inString;
        }
        if (!inString) {
            if (ch === ' ') {
                continue;
            }
            if (ch === '{' || ch === '[') {
                scope++;
            }
            else if (ch === '}' || ch === ']') {
                scope--;
            }
        }
        if (context === 'start') {
            if (ch !== '[') {
                throw new Error(i + ", " + ch);
            }
            context = 'element';
            continue;
        }
        if (context === 'element') {
            if ((ch === ',' || ch === ']') && scope <= 1 && !inString) {
                if (tmpVal === undefined) {
                    break;
                }
                if (tmpVal.length === 0 && list.length) {
                    continue;
                }
                var val = parse_1.default(tmpVal);
                list.push(val);
                tmpVal = '';
                continue;
            }
            tmpVal = tmpVal === undefined ? ch : tmpVal + ch;
        }
    }
    return list;
}
exports.default = default_1;
