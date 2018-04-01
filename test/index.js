import plugin from '../src';
import * as babel from '@babel/core';
import assert from 'assert';
import dedent from 'dedent';

/**
 * @typedef {Object} TestCase
 * @property {string} input
 * @property {string} output
 * @property {string} name
 */

/**
 * @type {Array<TestCase>}
 */
const tests = [
    {
        input: 'tf(a + b);',
        output: 'tf.add(a, b);',
        name: 'tf.add;',
    },
    {
        name: 'Int Literal',
        input: 'tf(5);',
        output: 'tf.scalar(5);',
    },
    {
        name: 'Add literals',
        input: 'tf(5 + 6);',
        output: 'tf.add(tf.scalar(5), tf.scalar(6));',
    },
    {
        name: 'Add many literals',
        input: 'tf(5 + 6 + 7);',
        output: 'tf.add(tf.add(tf.scalar(5), tf.scalar(6)), tf.scalar(7));',
    },
    {
        name: 'Tensor literal',
        input: 'tf([[1, 2], [3, 4]]);',
        output: 'tf.tensor([[1, 2], [3, 4]]);',
    },
    {
        name: 'scalar mult',
        input: 'tf(5 * [1, 2] + [2, 2]);',
        // eslint-disable-next-line max-len
        output: 'tf.add(tf.mul(tf.scalar(5), tf.tensor([1, 2])), tf.tensor([2, 2]));',
    },
    {
        name: 'variables',
        input: dedent`
            const A = tf([[1, 2], [3, 4]]);
            const w = tf([1, 1]);
            const b = tf([2, 2]);
            tf(A * w + b);
        `,
        output: dedent`
            const A = tf.tensor([[1, 2], [3, 4]]);
            const w = tf.tensor([1, 1]);
            const b = tf.tensor([2, 2]);
            tf.add(tf.mul(A, w), b);
        `,
    },
    {
        name: 'No tf - int literal',
        input: '5;',
        output: '5;',
    },
];

tests.forEach((testCase) => {
    it(testCase.name || 'Test case', () => {
        const transformed = babel.transformSync(testCase.input, {
            plugins: [plugin],
        }).code;
        assert.strictEqual(transformed, testCase.output);
    });
});
