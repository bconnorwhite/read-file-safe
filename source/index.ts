import fs, { promises } from "fs";

type Options = {
  /**
   * Return content as a buffer. Default: `false`
   */
  buffer?: boolean;
}

function getEncoding(buffer?: boolean) {
  return buffer ? null : "utf8";
}

export async function readFile(path: string, options?: { buffer?: false }): Promise<string | undefined>;
export async function readFile(path: string, options: { buffer: true }): Promise<Buffer | undefined>;
export async function readFile(path: string, options: Options = {}) {
  return promises.readFile(path, { encoding: getEncoding(options.buffer) }).then((content) => {
    return content;
  }).catch(() => {
    return undefined;
  });
}

export function readFileSync(path: string, options?: { buffer?: false }): string | undefined;
export function readFileSync(path: string, options: { buffer: true }): Buffer | undefined;
export function readFileSync(path: string, options: Options = {}) {
  try {
    // eslint-disable-next-line no-sync
    return fs.readFileSync(path, { encoding: getEncoding(options.buffer) });
  } catch(e) {
    return undefined;
  }
}
