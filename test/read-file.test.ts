import { beforeEach, test } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readFile } from "../source";

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

test("read", async () => {
  return readFile("/test/note.md").then((text) => {
    expect(text).toBe("hello world!");
  });
});

test("read buffer", async () => {
  return readFile("/test/note.md", { buffer: true }).then((text) => {
    expect(text?.toString()).toBe("hello world!");
  });
});

test("read empty", async () => {
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe(undefined);
  });
});

test("read no access", async () => {
  return readFile("/no-access/b").then((text) => {
    expect(text).toBe(undefined);
  });
});
