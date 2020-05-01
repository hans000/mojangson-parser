"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseString_1 = __importDefault(require("./parseString"));
var parseArray_1 = __importDefault(require("./parseArray"));
var parseCompound_1 = __importDefault(require("./parseCompound"));
var parseJsonString_1 = __importDefault(require("./parseJsonString"));
function parse(value) {
    if (value.startsWith('[') && value.endsWith(']')) {
        return parseArray_1.default(value);
    }
    if (value.startsWith('{') && value.endsWith('}')) {
        return parseCompound_1.default(value);
    }
    if (value.startsWith("'") && value.endsWith("'")) {
        return parseJsonString_1.default(value);
    }
    return parseString_1.default(value);
}
exports.default = parse;
