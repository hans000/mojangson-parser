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

mojangson(`{}`)  // -> {}
mojangson(`{a: 1b}`) // -> { a: "1b" }
mojangson(`{a: ["1", "2"]}`)  // -> { a: ["1", "2"] }
mojangson(`{a: '{"b": "c"}'}`)  // -> { a: "{\"b\": \"c\"}" }

```

See the package source for more details.


