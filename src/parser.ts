import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
import { Puzzle, Cell, CellState } from './puzzle.js';


//BOARD_FILE ::= ROW "x" COLUMN NEWLINE (REGION NEWLINE)+
//REGION ::= POSITION (" ")+ POSITION "|" (POSITION)+

//POSITION ::= INT "," INT
//ROW ::= INT
//COLUMN ::= INT
//INT ::= [0-9]+
//NEWLINE ::= "\r"? "\n"

const grammar = `@skip whitespace {
    puzzleFile ::= number "x" number newline (region newline)+;
    region ::= positionList space "|" space positionList;
    positionList ::= position (space position)*
    position ::= number "," number;
    space ::= " "+;
}
number ::= [0-9]+;
newline ::= "\r"? "\n";
whitespace ::= [ \t\r\n]+;`;

enum PuzzleGrammar {
    PuzzleFile,
    Region,
    PositionList,
    Position,
    Space,
    Number,
    Newline,
    Whitespace
}

export const parser: Parser<PuzzleGrammar> = compile(grammar, PuzzleGrammar, PuzzleGrammar.PuzzleFile);


/**
 * Take a string representation of a star puzzle and returns the Puzzle 
 * ADT that represents this puzzle,
 * 
 * @param input the string representation of the puzzle
 * @returns the Puzzle ADT that is representative of this string
 * @throws Error if the input could not be parsed or is an invalid puzzle
 */
export function parsePuzzle(input: string): Puzzle {
    
    const parseTree: ParseTree<PuzzleGrammar> = parser.parse(input);

    // Get puzzle dimensions
    const dims = parseTree.childrenByName(PuzzleGrammar.Number).map(child => parseInt(child.text));
    if (dims.length < 2) throw new Error("Invalid puzzle dimensions");
    const width = dims[0];
    const height = dims[1];
    if (width === undefined || height === undefined) throw new Error('undefined board dimensions');

    // Parse all regions
    const regions = parseTree.childrenByName(PuzzleGrammar.Region);
    const cells: Cell[] = [];
    for (let regionIdx = 0; regionIdx < regions.length; regionIdx += 1) {
        const region = regions[regionIdx];
        const positionLists = region?.childrenByName(PuzzleGrammar.PositionList);
        if (positionLists === undefined) throw new Error('no position lists in region');
        const stars = positionLists[0];
        const blanks = positionLists[1];
        if (stars === undefined) throw new Error('no solution squares given');
        if (blanks === undefined) throw new Error('no blank squares given');

        // push solution cells 
        for (const star of stars.childrenByName(PuzzleGrammar.Position)) {
            const starDims = star.childrenByName(PuzzleGrammar.Number);
            if (starDims[0] === undefined || starDims[1] === undefined) throw new Error('position should have two numbers for row and column');
            const cell = { row: parseInt(starDims[0].text) - 1, col: parseInt(starDims[1].text) - 1, regionId: regionIdx, currentState: CellState.Empty, expectedState: CellState.Star};
            cells.push(cell);
        }

        // push blank cells
        for (const blank of blanks.childrenByName(PuzzleGrammar.Position)) {
            const blankDims = blank.childrenByName(PuzzleGrammar.Number);
            if (blankDims[0] === undefined || blankDims[1] === undefined) throw new Error('position should have two numbers for row and column');
            const cell = { row: parseInt(blankDims[0].text) - 1, col: parseInt(blankDims[1].text) - 1, regionId: regionIdx, currentState: CellState.Empty, expectedState: CellState.Empty};
            cells.push(cell);
        }
        
    }

    // Create and return the Puzzle
    return new Puzzle(height, width, cells);
}

