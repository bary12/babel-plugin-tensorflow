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

[More examples](./examples.md)

## Install

With npm

```bash
npm install --save-dev babel-plugin-tensorflow
```

With [yarn](https://yarnpkg.com)

```bash
yarn add --dev babel-plugin-tensorflow
```

And add the plugin to your `.babelrc` file

```json
{
  "plugins": [
    "tensorflow"
  ]
}
```


## Known limitations

* Currently built only for babel 7.
* `tf` must be the name TensorFlow is imported as.

This is still just a prototype. Suggestions and PRs are welcome!