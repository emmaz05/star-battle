

import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
import { Puzzle, Region } from 'somewhere';


//BOARD_FILE ::= ROW "x" COLUMN NEWLINE (REGION NEWLINE)+
//REGION ::= POSITION (" ")+ POSITION "|" (POSITION)+

//POSITION ::= INT "," INT
//ROW ::= INT
//COLUMN ::= INT
//INT ::= [0-9]+
//NEWLINE ::= "\r"? "\n"

const grammar = `@skip whitespace {
    puzzleFile ::= number "x" number newline (region newline)*;
    region ::= position (" ")* position "|" (position)*;
    position ::= int "," int; 
}
number ::= [0-9]+;
newline ::= "\r"? "\n";
whitespace ::= [ \\t\\r\\n]+;
`;

enum PuzzleGrammar {
    PuzzleFile,
    Region,
    Position
}

export const parser: Parser<PuzzleGrammar> = compile(grammar, PuzzleGrammar, PuzzleGrammar.PuzzleFile);


/**
 * Take a string representation of a star puzzle and returns the Puzzle 
 * ADT that represents this puzzle,
 * 
 * @param input the string representation of the puzzle
 * @returns the Puzzle ADT that is rpesentative of this string
 * @throws Error if the input could not be parsed
 */
export function parsePuzzle(input: string): Puzzle {
    
    const parseTree: ParseTree<PuzzleGrammar> = parser.parse(input);
    
    // Get the width and the height of the puzzle
    const width  = doSomethingWith(parseTree);
    const height = doSomethingWith(parseTree);

    // Then, go over all its regions
    const regionSyntaxTrees: Array<ParseTree<PuzzleGrammar>> = parseTree.childrenByName(PuzzleGrammar.Region);
    const parsedRegions: Array<Region> = [];

    // And parse each of them
    for (const region of regionSyntaxTrees) {
        const parsedRegion: Region = doSomethingWith(region);
        parsedRegions.push(parsedRegion);
    }

    // Finally, create the puzzle using all the regions
    return new Puzzle(parsedRegions);
}

/**
 * PLACEHOLDER!!!!!
 * 
 * FUNCTION THAT DOES SOMETHING
 * @param something SOMETHING
 * @returns SOMETHING
 */
function doSomethingWith(something: any): any {
    throw new Error(`Have not done something with ${something} yet`)
}