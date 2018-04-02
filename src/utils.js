import * as t from '@babel/types';

export const tf = 'tf';

const isTF = path => Boolean(
  path.findParent(({
    node
  }) =>
    t.isCallExpression(node) &&
        t.isIdentifier(node.callee) &&
        node.callee.name == tf
  )
);

const insideTensor = path => path.findParent(({node}) =>
  t.isCallExpression(node) &&
    t.isMemberExpression(node.callee) &&
    t.isIdentifier(node.callee.object) &&
    node.callee.object.name === tf &&
    t.isIdentifier(node.callee.property) &&
    node.callee.property.name === 'tensor'
);

export const shouldParse = path => isTF(path) && !insideTensor(path);
