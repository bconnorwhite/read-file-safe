import { beforeEach, test, afterEach, expect } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readFileSync } from "../source/index.js";

beforeEach(async () => {
  mock({
    "/test": {
      "note.md": "hello world!"
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

test("read sync", async () => {
  expect(readFileSync("/test/note.md")).toBe("hello world!");
});

test("read buffer sync", async () => {
  expect(readFileSync("/test/note.md", { buffer: true })?.toString()).toBe("hello world!");
});

test("read empty sync", async () => {
  expect(readFileSync("/test/note2.md")).toBe(undefined);
});

test("read no access sync", async () => {
  expect(readFileSync("/no-access/b")).toBe(undefined);
});
