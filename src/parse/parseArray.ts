import parse from "./parse"

type StateType = 'start' | 'element'

export default function(value: string) {
    const list = []
    let context: StateType = 'start'
    let scope = 0
    let tmpVal = ''
    let normalString = false
    
    for (let i = 0; i < value.length; i++) {
        const ch = value[i]
        if (ch === `"`) {
            normalString = !normalString
        }
        if (!normalString) {
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
            if (ch !== '[') {
                throw new Error(`${i}, ${ch}`)
            }
            context = 'element'
            continue
        }
        if (context === 'element') {
            if ((ch === ',' || ch === ']') && scope <= 1 && !normalString) {
                if (tmpVal.length === 0 && list.length) {
                    continue
                }
                const val = parse(tmpVal)
                list.push(val)
                tmpVal = ''
                continue
            }
            tmpVal += ch
        }
    }
    return list
}