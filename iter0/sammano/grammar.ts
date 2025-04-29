//STILL WORKING


import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
// the grammar
const grammar = `
@skip whitespace {
    board ::= fileDims '\n' (region '\n')*;
    region ::= (square)* '|' (square)+ ;
    fileDims ::= number 'x' number;
    square ::= number ',' number;
}
number ::= [0-9]+;
whitespace ::= [ \\t\\r\\n]+;
`;