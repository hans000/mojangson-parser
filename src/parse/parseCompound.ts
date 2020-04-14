import parse from "./parse"

type StateType = 'start' | 'key' | 'value'

export default function(value: string) {
    const obj: any = {}
    let context: StateType = 'start'
    let tmpKey = '', tmpVal = ''
    let scope = 0
    let normalString = false
    let jsonString = false

    for (let i = 0; i < value.length; i++) {
        const ch = value[i]
        if (ch === `"` && !jsonString) {
            normalString = !normalString
        }
        if (ch === `'` && !normalString) {
            jsonString = !jsonString
        }
        if (!normalString || !jsonString) {
            if (ch === ' ') {
                continue
            }
            if (ch === '{' || ch === '[') {
                scope++
            } else if (ch === '}' || ch === ']') {
                scope--
            }
        }
        if (context === 'start') {
            if (ch !== '{') {
                throw new Error(`'${value}' missing '{'`)
            }
            context = 'key'
            continue
        }
        if (context === 'key') {
            if (ch === ':' && scope <= 1) {
                if (tmpKey) {
                    context = 'value'
                    continue
                }
                throw new Error(`whitespace can not be key`)
            }
            if (ch === ',') {
                continue
            }
            tmpKey += ch
            continue
        }
        if (context === 'value') {
            if ((ch === ',' || ch === '}') && scope <= 1) {
                if (!normalString && !jsonString) {
                    context = 'key'
                    if (scope && ch === '}') {
                        tmpVal += ch
                    }
                    obj[tmpKey] = parse(tmpVal)
                    tmpKey = ''
                    tmpVal = ''
                    continue
                } else if (normalString) {
                    throw new Error(`'${tmpVal}' missing quote before '${ch}'`)
                } else if (jsonString) {
                    throw new Error(`'${tmpVal}' missing single quote before '${ch}'`)
                }
            }
            tmpVal += ch
        }
    }
    return obj
}