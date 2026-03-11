/* eslint-disable import/no-relative-parent-imports, @typescript-eslint/no-floating-promises */
import assert from "node:assert/strict";
import { beforeEach, test, afterEach } from "node:test";
import { gzipSync, brotliCompressSync } from "node:zlib";
import mock, { restore, directory } from "mock-fs";
import { readFileSync } from "../src/index.ts";

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

test("read sync", () => {
  assert.equal(readFileSync("/test/note.md"), "hello world!");
});

test("read buffer sync", () => {
  assert.equal(readFileSync("/test/note.md", { buffer: true })?.toString(), "hello world!");
});

test("read empty sync", () => {
  assert.equal(readFileSync("/test/note2.md"), undefined);
});

test("read no access sync", () => {
  assert.equal(readFileSync("/no-access/b"), undefined);
});

test("read gzip sync", () => {
  assert.equal(readFileSync("/compressed/note.md.gz", { compression: "gzip" }), "hello world!");
});

test("read brotli sync", () => {
  assert.equal(readFileSync("/compressed/note.md.br", { compression: "brotli" }), "hello world!");
});

test("read invalid sync", () => {
  assert.equal(readFileSync("/compressed/note.md.gz", { compression: "brotli" }), undefined);
});
