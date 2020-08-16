import fs, { promises } from "fs";

function handleError(err: NodeJS.ErrnoException) {
  if(err.code !== "ENOENT") {
    throw(err);
  } else {
    return undefined;
  }
}

export async function readFile(path: string) {
  return promises.readFile(path).then((buffer) => {
    return buffer.toString();
  }).catch((err) => {
    return handleError(err);
  });
}

export function readFileSync(path: string) {
  try {
    const data = fs.readFileSync(path);
    return data.toString();
  } catch(err) {
    return handleError(err);
  }
}
