import fs, { promises } from "node:fs";

export type Options = {
  /**
   * Return content as a Buffer. Default: `false`
   */
  buffer?: boolean;
};

export type ContentType<O extends Options | undefined = undefined> = O extends { buffer: true } ? Buffer : string;

function getEncoding(buffer?: boolean) {
  return buffer ? null : "utf8";
}

export async function readFile<O extends Options | undefined = undefined>(path: string, options?: O): Promise<ContentType<O> | undefined> {
  return promises.readFile(path, { encoding: getEncoding(options?.buffer) }).then((content) => {
    return content as ContentType<O>;
  }).catch(() => {
    return undefined;
  });
}

export function readFileSync<O extends Options | undefined = undefined>(path: string, options?: O): ContentType<O> | undefined {
  try {
    // eslint-disable-next-line no-sync
    return fs.readFileSync(path, { encoding: getEncoding(options?.buffer) }) as ContentType<O>;
  } catch(e) {
    return undefined;
  }
}
