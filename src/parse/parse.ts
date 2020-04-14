import parseString from "./parseString"
import parseArray from "./parseArray"
import parseCompound from "./parseCompound"
import parseJsonString from "./parseJsonString";

export default function parse(value: string): any {
    if (value.startsWith('[') && value.endsWith(']')) {
        return parseArray(value)
    }
    if (value.startsWith('{') && value.endsWith('}')) {
        return parseCompound(value);
    }
    if (value.startsWith(`'`) && value.endsWith(`'`)) {
        return parseJsonString(value);
    }
    return parseString(value)
}