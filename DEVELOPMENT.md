# Development

## Testing

It would be nice to run tests in Bun, but the tests use `mock-fs`, which depends on Node internal `fs` behavior that Bun does not fully emulate yet. This causes the test harness to fail before the assertions run.

Relevant Bun issue:

- [oven-sh/bun#3546](https://github.com/oven-sh/bun/issues/3546)

Once Bun is compatible with this part of the Node `fs` internals, the Bun test workflow can be revisited.
