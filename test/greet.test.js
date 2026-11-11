import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greet } from '../src/greet.js';

test('greets a name', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
});

test('trims spaces around the name', () => {
  assert.equal(greet('  Ada  '), 'Hello, Ada!');
});

test('greets the world when the name is missing or blank', () => {
  assert.equal(greet(), 'Hello, world!');
  assert.equal(greet(null), 'Hello, world!');
  assert.equal(greet('   '), 'Hello, world!');
});

test('cuts a long name to 50 characters', () => {
  assert.equal(greet('a'.repeat(80)), `Hello, ${'a'.repeat(50)}!`);
});
