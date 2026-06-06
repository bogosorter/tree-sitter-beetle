import XCTest
import SwiftTreeSitter
import TreeSitterBeetle

final class TreeSitterBeetleTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_beetle())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading beetle grammar")
    }
}
