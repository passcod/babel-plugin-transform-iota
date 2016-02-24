'use strict'

module.exports = function (args) {
  var t = args.types
  var i = 0

  return {
    visitor: {
      CallExpression: function CallExpression (path) {
        if (path.get('callee').isIdentifier({ name: 'iota' })) {
          path.replaceWith(
            t.arrayExpression(
              [t.numericLiteral(i += 1)]
            )
          )
        }
      },
      FunctionDeclaration: function FunctionDeclaration (path) {
        if (path.get('id').isIdentifier({ name: 'iota' })) {
          path.remove()
        }
      }
    }
  }
}
