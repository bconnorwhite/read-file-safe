# read-file-safe
![dependencies](https://img.shields.io/david/read-file-safe)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/read-file-safe)
![npm](https://img.shields.io/npm/v/read-file-safe)

Read files without try catch.

Returns `undefined` if the file does not exist.

```
yarn add read-file-safe
```

## API
```ts
import { readFile, readFileSync } from "read-file-safe";

readFileSync(path: string) => string | undefined;

readFile(path: string) => Promise<string | undefined>;
```

