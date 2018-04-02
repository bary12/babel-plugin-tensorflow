import dedent from 'dedent';

export default [
  {
    input: 'tf(a + b);',
    output: 'tf.add(a, b);',
    name: 'tf.add;'
  },
  {
    name: 'Int Literal',
    input: 'tf(5);',
    output: 'tf.scalar(5);'
  },
  {
    name: 'Addition',
    input: 'tf(5 + 6);',
    output: 'tf.add(tf.scalar(5), tf.scalar(6));'
  },
  {
    name: 'More operations',
    input: 'tf(5 + 6 * 7);',
    output: 'tf.add(tf.scalar(5), tf.mul(tf.scalar(6), tf.scalar(7)));'
  },
  {
    name: 'Tensor Literals',
    input: 'tf([[1, 2], [3, 4]]);',
    output: 'tf.tensor([[1, 2], [3, 4]]);'
  },
  {
    name: 'Operations on tensors',
    input: 'tf(5 * [1, 2] + [2, 2]);',
    // eslint-disable-next-line max-len
    output: 'tf.add(tf.mul(tf.scalar(5), tf.tensor([1, 2])), tf.tensor([2, 2]));'
  },
  {
    name: 'Working with Variables',
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
    `
  },
  {
    name: 'Transpose',
    input: 'tf([[1, 5, 4], [9, 9, 9]] ^ t);',
    output: 'tf.transpose(tf.tensor([[1, 5, 4], [9, 9, 9]]));'
  },
  {
    name: 'Other Functions',
    input: 'tf(abs(5) + sin(-6))',
    output: 'tf.add(tf.abs(tf.scalar(5)), tf.sin(tf.neg(tf.scalar(6))));'
  },
  {
    name: 'Does not touch unkown binary and unary operators',
    input: 'tf(1 || ~2);',
    output: 'tf.scalar(1) || ~tf.scalar(2);'
  },
  {
    name: 'Without tf(), nothing changes.',
    input: '5;',
    output: '5;'
  }
];
