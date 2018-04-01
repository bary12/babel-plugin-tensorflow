# [Prototype] Babel Plugin TensorFlow

Use native javascript math operators on TensorFlow objects.

Turns

```javascript
tf(A * w + b);
```

into 

```javascript
tf.add(tf.mul(A, w), b);
```

And also

```javascript
tf(5 * [1, 2] + [2, 2]);
```

into

```javascript
tf.add(tf.mul(tf.scalar(5), tf.tensor([1, 2])), tf.tensor([2, 2]));
```

## Known limitations

* Currently built only for babel 7.
* `tf` must be the name TensorFlow is imported as.

This is still just a prototype. Suggestions and PRs are welcome!