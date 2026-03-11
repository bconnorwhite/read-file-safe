/* eslint-disable import/no-relative-parent-imports, @typescript-eslint/no-floating-promises */
import assert from "node:assert/strict";
import { beforeEach, test, afterEach } from "node:test";
import { gzipSync, brotliCompressSync } from "node:zlib";
import mock, { restore, directory } from "mock-fs";
import { readFile } from "../src/index.ts";

beforeEach(() => {
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

afterEach(() => {
  restore();
});

test("read", async () => {
  const text = await readFile("/test/note.md");
  assert.equal(text, "hello world!");
});

test("read buffer", async () => {
  const text = await readFile("/test/note.md", { buffer: true });
  assert.equal(text?.toString(), "hello world!");
});

test("read empty", async () => {
  const text = await readFile("/test/note2.md");
  assert.equal(text, undefined);
});

test("read no access", async () => {
  const text = await readFile("/no-access/b");
  assert.equal(text, undefined);
});

test("read gzip", async () => {
  const text = await readFile("/compressed/note.md.gz", { compression: "gzip" });
  assert.equal(text, "hello world!");
});

test("read brotli", async () => {
  const text = await readFile("/compressed/note.md.br", { compression: "brotli" });
  assert.equal(text, "hello world!");
});

test("read invalid", async () => {
  const text = await readFile("/compressed/note.md.gz", { compression: "brotli" });
  assert.equal(text, undefined);
})
