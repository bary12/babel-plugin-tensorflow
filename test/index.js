import plugin from '../src';
import * as babel from '@babel/core';
import assert from 'assert';
import tests from './testCases';

/**
 * @typedef {Object} TestCase
 * @property {string} input
 * @property {string} output
 * @property {string} name
 */

/**
 * @type {Array<TestCase>}
 */

tests.forEach(testCase => {
  it(testCase.name || 'Test case', () => {
    const transformed = babel.transformSync(testCase.input, {
      plugins: [plugin]
    }).code;
    assert.strictEqual(transformed, testCase.output);
  });
});
