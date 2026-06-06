package tree_sitter_beetle_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_beetle "github.com/tree-sitter/tree-sitter-beetle/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_beetle.Language())
	if language == nil {
		t.Errorf("Error loading beetle grammar")
	}
}
