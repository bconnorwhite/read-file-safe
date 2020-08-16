# read-file-safe
![dependencies](https://img.shields.io/david/safe-read-file)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/safe-read-file)
![npm](https://img.shields.io/npm/v/safe-read-file)

Read files without try catch.

Returns `undefined` if the file does not exist.

```
yarn add read-file-safe
```

## API
```ts
import { readFile, readFileSync } from "read-file-safe";

readFileSync(path) => string | undefined;

readFile(path: string) => Promise<string | undefined>;
```

