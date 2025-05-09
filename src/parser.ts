
import { Parser, ParseTree, compile } from 'parserlib';
import { Puzzle, Cell, CellState } from './puzzle.js';


const grammar = `

puzzleFile ::= comment* number 'x' number newline (region newline)+ newline*;
region ::= positionList* space '|' space positionList;
positionList ::= position (space position)*;
position ::= number ',' number;
comment ::= '#' [^\\n\\r]* newline;
space ::= ' '*;
number ::= [0-9]+;

newline ::= "\\r"? "\\n";
whitespace ::= [ \\t\\r\\n]+;
`;


enum PuzzleGrammar {
    PuzzleFile,
    Region,
    PositionList,
    Position,
    Space,
    Number,
    Comment,
    Whitespace,
    Newline
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
    const width = dims[1];
    const height = dims[0];
    if (width === undefined || height === undefined) throw new Error('undefined board dimensions');

    // Parse all regions, and create an array of all the cells within all regions
    const regions = parseTree.childrenByName(PuzzleGrammar.Region);
    const cells: Cell[] = [];
    for (let regionIdx = 0; regionIdx < regions.length; regionIdx += 1) {
        const region = regions[regionIdx];
        const positionLists = region?.childrenByName(PuzzleGrammar.PositionList);
        if (positionLists === undefined) throw new Error('no position lists in region');
        
        for (const positionList of positionLists) {
            for (const unparsedCell of positionList.childrenByName(PuzzleGrammar.Position)) {
                const cellDims = unparsedCell.childrenByName(PuzzleGrammar.Number);
                if (cellDims[0] === undefined || cellDims[1] === undefined) throw new Error('position should have two numbers for row and column');

                // Parse the row an column to Puzzle coordinates (0-indexed), and add the new cell to cells
                const parsedRow = parseInt(cellDims[0].text) - 1;
                const parsedCol = parseInt(cellDims[1].text) - 1;
                const cell = {
                    row: parsedRow, 
                    col: parsedCol, 
                    regionId: regionIdx, 
                    state: CellState.Empty,  // All new cells start off as empty
                };
                cells.push(cell);
            }
        }
        
    }

    // Create and return the Puzzle
    return new Puzzle(height, width, cells);
}

