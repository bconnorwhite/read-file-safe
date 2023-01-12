import { beforeEach, test, afterEach, expect } from "@jest/globals";
import { gzipSync, brotliCompressSync } from "zlib";
import mock, { restore, directory } from "mock-fs";
import { readFile } from "../source/index.js";

beforeEach(async () => {
  mock({
    "/test": {
      "note.md": "hello world!"
    },
    "/compressed": {
      "note.md.gz": gzipSync("hello world!"),
      "note.md.br": brotliCompressSync("hello world!")
    },
    "/no-access": directory({
      mode: 0,
      items: {
        b: "no access"
      }
    })
  });
});

afterEach(async () => {
  restore();
});

test("read", async () => {
  const text = await readFile("/test/note.md");
  expect(text).toBe("hello world!");
});

test("read buffer", async () => {
  const text = await readFile("/test/note.md", { buffer: true });
  expect(text?.toString()).toBe("hello world!");
});

test("read empty", async () => {
  const text = await readFile("/test/note2.md");
  expect(text).toBe(undefined);
});

test("read no access", async () => {
  const text = await readFile("/no-access/b");
  expect(text).toBe(undefined);
});

test("read gzip", async () => {
  const text = await readFile("/compressed/note.md.gz", { compression: "gzip" });
  expect(text).toBe("hello world!");
});

test("read brotli", async () => {
  const text = await readFile("/compressed/note.md.br", { compression: "brotli" });
  expect(text).toBe("hello world!");
});

test("read invalid", async () => {
  const text = await readFile("/compressed/note.md.gz", { compression: "brotli" });
  expect(text).toBe(undefined);
})
