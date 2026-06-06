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
    source_file: $ => "hello"
  }
});
