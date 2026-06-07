/**
 * @file beetle grammar for tree-sitter
 * @author bogosorter <luiswbarbosa@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "beetle",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => seq($.returnExpression, ';'),

    returnExpression: $ => choice(
      seq($.assignment, ';', $.returnExpression),
      seq('if', $.expression, ':', $.returnExpression, ';', $.returnExpression),
      seq('return', $.expression)
    ),

    assignment: $ => choice(
      seq(field('assignee', $.symbol), $.function),
      seq(field('assignee', $.symbol), '=', $.expression)
    ),

    expression: $ => choice(
      prec(3, seq($.symbol, optional($.expressionCall))),
      prec(3, seq('(', $.expression, ')', $.expressionCall)),
      prec(3, $.integer),
      prec(3, $.boolean),
      prec.left(2, seq($.expression, '+', $.expression)),
      prec.left(2, seq($.expression, '-', $.expression)),
      prec.left(1, seq($.expression, '==', $.expression)),
      prec.left(1, seq($.expression, '<', $.expression)),
      prec.left(1, seq($.expression, '>', $.expression)),
      prec.left(1, seq($.expression, '<=', $.expression)),
      prec.left(1, seq($.expression, '>=', $.expression))
    ),
    expressionCall: $ => seq('(', $.expression, repeat(seq(',', $.expression)), ')', optional($.expressionCall)),

    function: $ => seq('(', $.symbol, ':', $.type, repeat(seq(',', $.symbol, ':', $.type)), ')', ':', $.type, '=', $.returnExpression),
    lambda: $ => seq('(', $.symbol, ':', $.type, repeat(seq(',', $.symbol, ':', $.type)), ')', ':', $.type, '=', $.expression),

    type: $ => choice(
      'integer',
      'boolean',
      seq('(', $.type, ')'),
      prec.right(seq($.type, '->', $.type))
    ),

    symbol: $ => new RustRegex('(?i)[a-z]+'),
    integer: $ => choice(
      '0',
      new RustRegex('[1-9][0-9]*')
    ),
    boolean: $ => choice(
      'true',
      'false'
    )
  }
});
