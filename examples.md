# tf.add;

```javascript
tf(a + b);
```

becomes

```javascript
tf.add(a, b);
```

# Int Literal

```javascript
tf(5);
```

becomes

```javascript
tf.scalar(5);
```

# Add literals

```javascript
tf(5 + 6);
```

becomes

```javascript
tf.add(tf.scalar(5), tf.scalar(6));
```

# Add many literals

```javascript
tf(5 + 6 + 7);
```

becomes

```javascript
tf.add(tf.add(tf.scalar(5), tf.scalar(6)), tf.scalar(7));
```

# Tensor literal

```javascript
tf([[1, 2], [3, 4]]);
```

becomes

```javascript
tf.tensor([[1, 2], [3, 4]]);
```

# scalar mult

```javascript
tf(5 * [1, 2] + [2, 2]);
```

becomes

```javascript
tf.add(tf.mul(tf.scalar(5), tf.tensor([1, 2])), tf.tensor([2, 2]));
```

# variables

```javascript
const A = tf([[1, 2], [3, 4]]);
const w = tf([1, 1]);
const b = tf([2, 2]);
tf(A * w + b);
```

becomes

```javascript
const A = tf.tensor([[1, 2], [3, 4]]);
const w = tf.tensor([1, 1]);
const b = tf.tensor([2, 2]);
tf.add(tf.mul(A, w), b);
```

# transpose

```javascript
tf([[1, 5, 4], [9, 9, 9]] ^ t);
```

becomes

```javascript
tf.transpose(tf.tensor([[1, 5, 4], [9, 9, 9]]));
```

# other functions

```javascript
tf(abs(5) + sin(-6))
```

becomes

```javascript
tf.add(tf.abs(tf.scalar(5)), tf.sin(tf.neg(tf.scalar(6))));
```

# Does no touch unkown binary and unary operators

```javascript
tf(1 || ~2);
```

becomes

```javascript
tf.scalar(1) || ~tf.scalar(2);
```

# No tf - int literal

```javascript
5;
```

becomes

```javascript
5;
```