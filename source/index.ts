import fs, { promises } from "fs";

export type Options<T extends boolean> = {
  /**
   * Return content as a Buffer. Default: `false`
   */
  buffer?: T;
}

type BufferArgs = [options: Options<true>];
type StringArgs = [options?: Options<false>];

export type Args = StringArgs | BufferArgs;

type ReturnContent<T> = T extends StringArgs ? string : Buffer;

export type ReturnValue<T> = ReturnContent<T> | undefined;

function getEncoding(buffer?: boolean) {
  return buffer ? null : "utf8";
}

export async function readFile<T extends Args>(path: string, ...[options = {}]: T): Promise<ReturnValue<T>> {
  return promises.readFile(path, { encoding: getEncoding(options.buffer) }).then((content) => {
    return content as ReturnContent<T>;
  }).catch(() => {
    return undefined;
  });
}

export function readFileSync<T extends Args>(path: string, ...[options = {}]: T): ReturnValue<T> {
  try {
    // eslint-disable-next-line no-sync
    return fs.readFileSync(path, { encoding: getEncoding(options.buffer) }) as ReturnContent<T>;
  } catch(e) {
    return undefined;
  }
}
