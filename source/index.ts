import fs, { promises } from "fs";
import zlib from "zlib";

export type CompressionMethod = keyof typeof decompressionMethods;

export type Options = {
  /**
   * Return content as a Buffer. Default: `false`
   */
  buffer?: boolean;
  /**
   * Compression method to decompress the file against. Default: `none`
   */
  compression?: CompressionMethod;
};

const decompressionMethods = {
  none: {
    sync: (buffer: Buffer) => buffer,
    async: (buffer: Buffer, callback: (error: Error | null, result: Buffer) => void) => {
      callback(null, buffer);
    }
  },
  gzip: {
    sync: zlib.unzipSync,
    async: zlib.unzip
  },
  brotli: {
    sync: zlib.brotliDecompressSync,
    async: zlib.brotliDecompress
  }
} as const;

export type ContentType<O extends Options | undefined = undefined> = O extends { buffer: true }
  ? Buffer
  : string;

function format<O extends Options | undefined = undefined>(buffer: Buffer, options?: O): ContentType<O> {
  return (options?.buffer ? buffer : buffer.toString()) as ContentType<O>;
}

export async function readFile<O extends Options | undefined = undefined>(path: string, options?: O): Promise<ContentType<O> | undefined> {
  return promises.readFile(path).then((content) => {
    return new Promise<ContentType<O> | undefined>((resolve) => {
      decompressionMethods[options?.compression ?? "none"].async(content, (error, result) => {
        if(error) {
          resolve(undefined);
        } else {
          resolve(format(result, options));
        }
      });
    });
  }).catch(() => {
    return undefined;
  });
}

export function readFileSync<O extends Options | undefined = undefined>(path: string, options?: O): ContentType<O> | undefined {
  try {
    const buffer = fs.readFileSync(path);
    const decompressed = decompressionMethods[options?.compression ?? "none"].sync(buffer);
    return format(decompressed, options);
  } catch(e) {
    return undefined;
  }
}
