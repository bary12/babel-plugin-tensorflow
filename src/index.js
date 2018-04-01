import * as t from '@babel/types';
import {shouldParse, tf} from './utils';

const operators = {
    '+': 'add',
    '*': 'mul',
    '-': 'sub',
    '/': 'div',
    '**': 'pow',
};

export default (api) => ({
    visitor: {
        CallExpression: {
            exit(path) {
                const {node} = path;

                if (t.isIdentifier(node.callee) && node.callee.name === tf) {
                    path.replaceWith(node.arguments[0]);
                }
            },
        },
        NumericLiteral: {
            enter(path) {
                if (!shouldParse(path)) return;
                const parent = path.parentPath.node;
                if (t.isCallExpression(parent) &&
                    t.isMemberExpression(parent.callee) &&
                    t.isIdentifier(parent.callee.object) &&
                    t.isIdentifier(parent.callee.property) &&
                    parent.callee.object.name == tf &&
                    parent.callee.property.name == 'scalar'
                ) {
                    return;
                }
                path.replaceWith(t.callExpression(
                    t.memberExpression(
                        t.identifier(tf),
                        t.identifier('scalar')
                    ), [
                        t.numericLiteral(path.node.value),
                    ]
                ));
            },
        },
        BinaryExpression: {
            enter(path) {
                if (!shouldParse(path)) return;
                const {node} = path;
                let tfmethod = operators[node.operator];
                if (tfmethod === undefined) {
                    return;
                }
                path.replaceWith(t.callExpression(
                    t.memberExpression(
                        t.identifier(tf),
                        t.identifier(tfmethod)
                    ),
                    [
                        t.cloneDeep(node.left),
                        t.cloneDeep(node.right),
                    ]
                ));
            },
        },
        ArrayExpression: {
            enter(path) {
                if (!shouldParse(path)) return;
                path.replaceWith(t.callExpression(
                    t.memberExpression(
                        t.identifier(tf),
                        t.identifier('tensor')
                    ), [
                        t.cloneDeep(path.node),
                    ]
                ));
            },
        },
    },
});
