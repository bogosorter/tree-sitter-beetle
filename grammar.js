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
    source_file: $ => $.expression,
    expression: $ => choice(
      prec.left(2, seq($.expression, '+', $.expression)),
      prec.left(2, seq($.expression, '-', $.expression)),
      prec(1, $.symbol),
      prec(1, $.integer),
      prec(1, $.boolean)
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
