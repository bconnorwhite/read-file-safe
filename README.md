<!--BEGIN HEADER-->
<div id="top" align="center">
  <h1>read-file-safe</h1>
  <a href="https://npmjs.com/package/read-file-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/read-file-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/read-file-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/read-file-safe.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/read-file-safe?branch=master">
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/read-file-safe.svg?branch=master">
  </a>
</div>

<br />

<blockquote align="center">Read files without try catch.</blockquote>

<br />

_If I should maintain this repo, please ⭐️_
<a href="https://github.com/bconnorwhite/read-file-safe">
  <img align="right" alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/read-file-safe?label=%E2%AD%90%EF%B8%8F&style=social">
</a>

_DM me on [Twitter](https://twitter.com/bconnorwhite) if you have questions or suggestions._
<a href="https://twitter.com/bconnorwhite">
  <img align="right" alt="Twitter" src="https://img.shields.io/twitter/url?label=%40bconnorwhite&style=social&url=https%3A%2F%2Ftwitter.com%2Fbconnorwhite">
</a>

---
<!--END HEADER-->

This package handles filesystem errors for you. If a file does not exist or cannot be accessed, `undefined` is returned instead of throwing an error.

## Installation

```sh
yarn add read-file-safe
```

```sh
npm install read-file-safe
```

```sh
pnpm add read-file-safe
```

## Usage

By default, `readFile` and `readFileSync` return a string:

```ts
import { readFile, readFileSync } from "read-file-safe";

const path = "./path/to/file.ext";

const file = readFile(path); // Promise<string | undefined>

const file = readFileSync(path); // string | undefined
```

### Return Type

Setting the `buffer` option to `true` will return a `Buffer` instead of a string:

```ts
import { readFile, readFileSync } from "read-file-safe";

const file = readFile(path, { buffer: true }); // Promise<Buffer | undefined>

const file = readFileSync(path, { buffer: true }); // Buffer | undefined
```

### Decompression

Setting the `compression` option will decompress the file before returning it. Both `gzip` and `brotli` are supported:

```ts
import { readFile, readFileSync } from "read-file-safe";

const file = readFile(path, { compression: "gzip" }); // Promise<string | undefined>

const file = readFile(path, { compression: "brotli" }); // Promise<string | undefined>
```

<!--BEGIN FOOTER-->

<br />

<h2>Dev Dependencies</h2>

- [autorepo](https://www.npmjs.com/package/autorepo): Autorepo abstracts away your dev dependencies, providing a single command to run all of your scripts.

<br />

<h2 id="license">License <a href="https://opensource.org/licenses/MIT"><img align="right" alt="license" src="https://img.shields.io/npm/l/read-file-safe.svg"></a></h2>

[MIT](https://opensource.org/licenses/MIT) - _MIT License_
<!--END FOOTER-->

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and parent directories if necessary
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
