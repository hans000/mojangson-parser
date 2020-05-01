"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __importDefault(require("./parse"));
function default_1(value) {
    var obj = {};
    var context = 'start';
    var tmpKey = '', tmpVal = '';
    var scope = 0;
    var inString = false;
    var jsonString = false;
    for (var i = 0; i < value.length; i++) {
        var ch = value[i];
        if (ch === "\"" && !jsonString) {
            inString = !inString;
        }
        if (ch === "'") {
            inString = !inString;
            jsonString = !jsonString;
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
            if (ch !== '{') {
                throw new Error("'" + value + "' missing '{'");
            }
            context = 'key';
            continue;
        }
        if (context === 'key') {
            if (ch === ':' && scope <= 1) {
                if (tmpKey) {
                    context = 'value';
                    continue;
                }
                throw new Error("whitespace can not be key");
            }
            if (ch === ',') {
                continue;
            }
            tmpKey += ch;
            continue;
        }
        if (context === 'value') {
            if ((ch === ',' || ch === '}') && scope <= 1) {
                if (!inString) {
                    context = 'key';
                    if (scope && ch === '}') {
                        tmpVal += ch;
                    }
                    obj[tmpKey] = parse_1.default(tmpVal);
                    tmpKey = '';
                    tmpVal = '';
                    continue;
                }
                // {
                //     throw new Error(`'${tmpVal}' missing quote before '${ch}'`)
                // throw new Error(`'${tmpVal}' missing single quote before '${ch}'`)
                // }
            }
            tmpVal += ch;
        }
    }
    return obj;
}
exports.default = default_1;
