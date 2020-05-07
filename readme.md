# mojangson-parser

The mojangson-parser is a mojangson parser.

## Installation

### Using npm
```
npm i -S mojangson-parser
```

```
// load module
//commonjs
const mojangson = require('mojangson-parser')

// ES6 module
import mojangson from 'mojangson-parser'

// script
<script src="./dist/parse.js"></script>

    test('空对象', () => {
      expect(parse(`{}`)).toEqual({});
      expect(parse(`{foo:{baz:{}}}`)).toEqual({ foo: {  baz: {} } });
      expect(parse(`{foo:{},baz:{}}`)).toEqual({ foo: {}, baz: {} });
      expect(parse(`{foo:{},baz:{bar:{}}}`)).toEqual({ foo: {}, baz: { bar: {} } });
    })
    test('基础值类型', () => {
      expect(parse(`{foo:1}`)).toEqual({ foo: '1' });
      expect(parse(`{foo:1.1}`)).toEqual({ foo: '1.1' });
      expect(parse(`{foo:1.1d}`)).toEqual({ foo: '1.1d' });
      expect(parse(`{foo:1.1f}`)).toEqual({ foo: '1.1f' });
      expect(parse(`{foo:1b}`)).toEqual({ foo: '1b' });
      expect(parse(`{foo:"baz"}`)).toEqual({ foo: 'baz' });
    })
    test('转义', () => {
      expect(parse(`{foo:"{\\\"bar\\\":\\\"baz\\\"}"}`)).toEqual({ foo: '{"bar":"baz"}' });
      expect(parse(`{foo:'{"bar":"baz"}'}`)).toEqual({ foo: '{"bar":"baz"}' });
    })
    test('空白符', () => {
      expect(parse(`{ foo: 1 }`)).toEqual({ foo: '1' });
      expect(parse(`{ foo: 1.1 }`)).toEqual({ foo: '1.1' });
      expect(parse(`{foo: "baz" }`)).toEqual({ foo: 'baz' });
      expect(parse(`{foo: "ba z" }`)).toEqual({ foo: 'ba z' });
    })
    test('数组', () => {
      expect(parse(`{ foo: [1, 2, 3] }`)).toEqual({ foo: ["1", "2", "3"] });
      expect(parse(`{ foo: ["1", "2", "3"] }`)).toEqual({ foo: ["1", "2", "3"] });
      expect(parse(`{foo: [ { baz: {} } ] }`)).toEqual({ foo: [ { baz: {} } ] });
      expect(parse(`{foo: [{baz:[ 1, 2, 3 ] } ] }`)).toEqual({ foo: [ { baz: ["1","2","3"] } ] });
    })
    test('特殊数组', () => {
      expect(parse(`{ foo: [0: {}, 1: {}] }`)).toEqual({ foo: [{}, {}] });
      expect(parse(`{ foo: [0: { baz: 1b }, 1: {}] }`)).toEqual({ foo: [{ baz: '1b' }, {}] });
      expect(parse(`{ foo: [I; 123, 123, 132, 13] }`)).toEqual({ foo: ['123', '123', '132', '13'] });
    })

```

See the package source for more details.

### Example

[JText Studio](https://haima16.github.io/mc-jtext/), this is a online text json creator. One of the functions is automatic path generation. you can click 可选类型 -> nbt（radio button） -> 解析（input），that function used this module.

## License

MIT