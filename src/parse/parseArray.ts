import parse from "./parse"

type StateType = 'start' | 'element'

export default function(value: string) {
    const list = []
    let context: StateType = 'start'
    let scope = 0
    let tmpVal = undefined
    let inString = false
    
    for (let i = 0; i < value.length; i++) {
        const ch = value[i]
        if (ch === `"`) {
            inString = !inString
        }
        if (!inString) {
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
            if ((ch === ',' || ch === ']') && scope <= 1 && !inString) {
                if (tmpVal === undefined) {
                    break
                }
                if (tmpVal.length === 0 && list.length) {
                    continue
                }
                const val = parse(tmpVal)
                list.push(val)
                tmpVal = ''
                continue
            }
            tmpVal = tmpVal === undefined ? ch : tmpVal + ch
        }
    }
    return list
}