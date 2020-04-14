import parse from "../parse/parse";

type DataType = [string, any]

const data: DataType[] = [
    [`{}`, {}],
    [`{a:{}}`, { a: {} }],
    [`{a: []}`, { a: [] }],
    [`{a: 1}`, { a: '1' }],
    [`{a: 1b}`, { a: '1b' }],
    [`{a: [{b: {c: d}}]}`, { a: [{ b: { c: 'd' } }] }],
    [`{a: {b: 1}}`, { a: { b: '1' } }],
    [`{a: {b: 1}, c: {}}`, { a: { b: '1' }, c: {} }],
    [`{a:{}}`, { a: {} }],
    [`{a:["a","b"]}`, { a: ["a", "b"]}],
    [`{a:"{\"b\":\"c\"}"}`, {a:"{\"b\":\"c\"}"}],
]

// const a = `{VillagerData: {profession: "minecraft:none", level: 1, type: "minecraft:plains"}, HurtTime: 0s, Inventory: [], CustomNameVisible: 1b}`
// const a = `{a:'b'}`
// const a = `{a:'{"b":"c"}'}`
const a = `{a:[, "b, ]}`
try {
    const s = parse(a)
} catch (error) {
    console.log(error);
}
console.log(JSON.stringify(a));


// for (let i = 0; i < data.length; i++) {
//     const [a, b] = data[i]
//     const ra = JSON.stringify(parse(a))
//     const rb = JSON.stringify(b)
//     if (ra !== rb) {
//         console.log(i, ra, rb);
//         break
//     }
// }

// const result = data.every(([a, b]) => JSON.stringify(parse(a)) === JSON.stringify(b))
// console.log(result);
