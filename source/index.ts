import fs, { promises } from "fs";

type Options<T extends boolean> = {
  /**
   * Return content as a Buffer. Default: `false`
   */
  buffer?: T;
}

type BufferArgs = [path: string, options: Options<true>];
type StringArgs = [path: string, options?: Options<false>];

type Args = StringArgs | BufferArgs;

type ReturnValue<T> = T extends StringArgs ? string : Buffer;

function getEncoding(buffer?: boolean) {
  return buffer ? null : "utf8";
}

export async function readFile<T extends Args>(...[path, options = {}]: T): Promise<ReturnValue<T> | undefined> {
  return promises.readFile(path, { encoding: getEncoding(options.buffer) }).then((content) => {
    return content as ReturnValue<T>;
  }).catch(() => {
    return undefined;
  });
}

export function readFileSync<T extends Args>(...[path, options = {}]: T): ReturnValue<T> | undefined {
  try {
    // eslint-disable-next-line no-sync
    return fs.readFileSync(path, { encoding: getEncoding(options.buffer) }) as ReturnValue<T>;
  } catch(e) {
    return undefined;
  }
}
