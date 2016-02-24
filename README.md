# Babel transform: iota

[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://raw.githubusercontent.com/passcod/babel-plugin-transform-iota/master/LICENSE)
[![Travis CI Test Status](https://img.shields.io/travis/passcod/babel-plugin-transform-iota.svg?style=flat-square)](https://travis-ci.org/passcod/babel-plugin-transform-iota)
[![Code of Conduct](https://img.shields.io/badge/contributor-covenant-123456.svg?style=flat-square)](http://contributor-covenant.org/version/1/4/)

Transforms `iota()` calls into ever-increasing literals, à la [Go].

## Installation

```sh
$ npm install babel-plugin-transform-iota
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-iota"]
}
```

### Via CLI

```sh
$ babel --plugins transform-iota script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-iota"]
});
```

## Synopsis

**Input**

```js
var foo = iota()
let bar = iota()
bar.baz = iota()
const qux = {
  a: iota(),
  [iota()]: 'b'
}
```

**Output**

```js
var foo = [1]
let bar = [2]
bar.baz = [3]
const qux = {
  a: [4],
  [[5]]: 'b'
}
```

(`[5]` coerces to `"5"`, which becomes a valid key. We cannot directly use
`"5"` as iota, because we want to support the case where we add properties to
an iota, and we can't do that on string literals.)

Also removes all functions named `iota()`, so you can still define them and
have a working implementation without Babel (and so your code lints without
`/* global iota */` overrides).  Here's a working example:

```js
function iota () {
  if (!this.i) { this.i = 0 }
  return [this.i += 1]
}
```

## About

Made by [Félix Saparelli](https://passcod.name).
Licensed under [ISC](https://spdx.org/licenses/ISC.html).
Inspired by [Go].

[Go]: https://github.com/golang/go/wiki/Iota
