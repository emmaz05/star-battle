//STILL WORKING


import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
// the grammar
const grammar = `
@skip whitespace {
    expression ::= horizontal (topToBottomOperator horizontal)*;
    ....
    fileDims ::= number 'x' number;
    primitive ::= filename | caption | '(' expression ')';
}
topToBottomOperator ::= '---' '-'*;
filename ::= [A-Za-z0-9.][A-Za-z0-9._-]*;
number ::= [0-9]+;
caption ::= '"'[^"]*'"';
whitespace ::= [ \\t\\r\\n]+;
`;