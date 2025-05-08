import assert from 'assert';
import { Puzzle, Cell, CellState } from '../src/puzzle.js'
import { parsePuzzle } from '../src/parser.js';
import fs from 'fs';
// import { describe, it } from 'mocha';



const SMALL_GRID: Array<Cell> = [
    {row: 0, col: 0, regionId: 0, state: CellState.Empty},
    {row: 0, col: 1, regionId: 1, state: CellState.Star},
    {row: 0, col: 2, regionId: 1, state: CellState.Empty},
    {row: 1, col: 0, regionId: 0, state: CellState.Star}, //
    {row: 1, col: 1, regionId: 2, state: CellState.Empty},//
    {row: 1, col: 2, regionId: 1, state: CellState.Empty},//
    {row: 2, col: 0, regionId: 2, state: CellState.Empty},
    {row: 2, col: 1, regionId: 2, state: CellState.Empty},
    {row: 2, col: 2, regionId: 1, state: CellState.Star}
]



function addStars(puzzle: Puzzle, positions: Array<[number, number]>): Puzzle {
    for (const [row, col] of positions) {
        puzzle = puzzle.addStar(row, col);
    }
    return puzzle;
}

function removeStars(puzzle: Puzzle, positions: Array<[number, number]>): Puzzle {
    for (const [row, col] of positions) {
        puzzle = puzzle.removeStar(row, col);
    }
    return puzzle;
}


const KD_1_1_1: Puzzle = parsePuzzle(`10x10
1,2  1,5  | 1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5
2,9  4,10 | 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10
3,2  3,4  | 3,3
2,7  4,8  | 3,6 3,7 3,8
6,1  9,1  | 3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6
5,4  5,6  | 4,5 5,5 6,4 6,5 6,6
6,8  8,7  | 4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8
7,3  7,5  | 6,3 7,4
8,9 10,10 | 7,9 9,9 9,10
9,3  10,6 | 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9
`);
    
const SOLVED_KD_1_1_1: Puzzle = addStars(KD_1_1_1, [
    [0, 1],
    [0, 4],
    [1, 8],
    [3, 9],
    [2, 1],
    [2, 3],
    [1, 6],
    [3, 7],
    [5, 0],
    [8, 0],
    [4, 3],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 2],
    [6, 4],
    [7, 8],
    [9, 9],
    [8, 2],
    [9, 5]
]);



/**
 * Tests for the Puzzle abstract data type
 */
describe('Puzzle: constructor()', function () {
    //
    // Partitions:
    //  - on width: <= 0, >= 1
    //  - on height: <= 0, >= 1
    //  - on cells: span the grid, do not span the grid
    //  - on cells.length: = width * height, != width * height

    it('Covers: invalid width (width <= 0)', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(0, 9, SMALL_GRID);
            assert(false, "Expected error when creating a board with zero width was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const puzzle: Puzzle = new Puzzle(-4, 6, SMALL_GRID);
            assert(false, "Expected error when creating a board with negative width was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: invalid height (height <= 0)', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(8, 0, SMALL_GRID);
            assert(false, "Expected error when creating a board with zero height was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const puzzle: Puzzle = new Puzzle(3, -3, SMALL_GRID);
            assert(false, "Expected error when creating a board with negative height was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: cells.length !== width * height', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(8, 9, SMALL_GRID);
            assert(false, "Expected error when width * height != cells.length was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    // Spanning the grid refers to the fact that all locations should be unique, and
    // within grid bounds
    it('Covers: cells do not span the grid', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(1, 2, [
                {row: 0, col: 0, regionId: 0, state: CellState.Empty},
                {row: 0, col: 0, regionId: 1, state: CellState.Star},
                {row: 1, col: 0, regionId: 0, state: CellState.Empty},
                {row: 1, col: 1, regionId: 1, state: CellState.Star}
            ]);
            assert(false, "Expected error when cell coordinates do not span the whole grid was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: valid size and cells provided', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
            assert(true);
        } catch (e) {
            assert(false, `Ran into error ${e} when creating a puzzle grid that should have no problems.`)
        }
    
    });

})

describe('Puzzle: isEmptyAt()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - output: expected true, expected false
    
    
    it('Covers: invalid row index', function() { 
        
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        try {
            const isEmpty = puzzle.isEmptyAt(3, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const isEmpty = puzzle.isEmptyAt(-4, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const isEmpty = puzzle.isEmptyAt(0, 4);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const isEmpty = puzzle.isEmptyAt(2, -2);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: valid coords, cell IS empty', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                assert(
                    puzzle.isEmptyAt(cell.row, cell.col), 
                    `Expected true for empty cell (${cell.row}, ${cell.col}) but got false.`
                )
            }
        }
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);

        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Star) {
                assert(
                    !puzzle.isEmptyAt(cell.row, cell.col), 
                    `Expected false for star cell (${cell.row}, ${cell.col}) but got true.`
                )
            }
        }
    });
})

describe('Puzzle: hasStarAt()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - output: expected true, expected false
    
    
    it('Covers: invalid row index', function() { 
        
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const isEmpty = puzzle.hasStarAt(3, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const isEmpty = puzzle.hasStarAt(-4, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const isEmpty = puzzle.hasStarAt(0, 4);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const isEmpty = puzzle.hasStarAt(2, -2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: valid coords, cell has star', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Star) {
                assert(
                    puzzle.hasStarAt(cell.row, cell.col), 
                    `Expected true for star cell (${cell.row}, ${cell.col}) but got false.`
                )
            }
        }
    });

    it('Covers: valid coords, cell does not have star', function() { 
        
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);

        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                assert(
                    !puzzle.hasStarAt(cell.row, cell.col), 
                    `Expected false for empty cell (${cell.row}, ${cell.col}) but got true.`
                )
            }
        }
    });
})

describe('Puzzle: addStar()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star


    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        try {
            const newPuzzle: Puzzle = puzzle.addStar(7, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const newPuzzle: Puzzle = puzzle.addStar(-2, 0);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const newPuzzle: Puzzle = puzzle.addStar(0, 3);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const newPuzzle: Puzzle = puzzle.addStar(2, -1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: valid coords, cell IS empty', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                const newPuzzle: Puzzle = puzzle.addStar(cell.row, cell.col);
                assert(
                    newPuzzle.hasStarAt(cell.row, cell.col), 
                    `Expected true for empty cell (${cell.row}, ${cell.col}) but got false.`
                )
            }
        }
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Star) {
                try {
                    const newPuzzle: Puzzle = puzzle.addStar(cell.row, cell.col);
                    assert(false, `Expected error when adding a star to filled cell (${cell.row}, ${cell.col}) was not thrown.`);
                } catch (e) {
                    assert(true);
                }
                
            }
        }
    });
})

describe('Puzzle: removeStar()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star

    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        try {
            const newPuzzle: Puzzle = puzzle.removeStar(7, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const newPuzzle: Puzzle = puzzle.removeStar(-2, 0);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const newPuzzle: Puzzle = puzzle.removeStar(0, 3);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const newPuzzle: Puzzle = puzzle.removeStar(2, -1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: valid coords, cell IS empty', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                try {
                    const newPuzzle: Puzzle = puzzle.removeStar(cell.row, cell.col);
                    assert(false, `Expected error when removing a star from empty cell (${cell.row}, ${cell.col}) was not thrown.`);
                } catch (e) {
                    assert(true);
                }
            }
        }
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Star) {
                const newPuzzle: Puzzle = puzzle.removeStar(cell.row, cell.col);
                assert(
                    newPuzzle.isEmptyAt(cell.row, cell.col), 
                    `Expected true for empty cell (${cell.row}, ${cell.col}) but got false.`
                )
            }
        }
    });
})

describe('Puzzle: getCellAt()', function() {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds

    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        
        try {
            const cell: Cell = puzzle.getCellAt(4, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

        try {
            const cell: Cell = puzzle.getCellAt(-1, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) {
            assert(true);
        }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        try {
            const cell: Cell = puzzle.getCellAt(0, 5);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }

        try {
            const cell: Cell = puzzle.getCellAt(0, -5);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) {
            assert(true);
        }
    });

    it('Covers: valid coordinates', function() { 
        const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);
        for (const cell of SMALL_GRID) {
            const returnedCell: Cell = puzzle.getCellAt(cell.row, cell.col);
            assert.deepEqual(
                returnedCell,
                cell,
                `Expected ${JSON.stringify(cell)} but got ${JSON.stringify(returnedCell)}`
            )
        }
    });

})

describe('Puzzle: isSolved()', function () {
    //
    // Partitions:
    //  - on outputs: true, false
    //  - FOR FALSE OUTPUTS, FALSE BECAUSE:
    //      - no stars in the grid
    //      - row with not exactly 2 stars
    //      - column with not exactly 2 stars
    //      - region with not exactly 2 star
    //      - stars adjacent

    it('Covers: expected true', async function() { 
        assert(SOLVED_KD_1_1_1.isSolved(), "Expected solved puzzle to be solved.");
    });

    it('Covers: expected false - empty grid', function() { 
        assert(!KD_1_1_1.isSolved(), "Expected empty grid to be unsolved.");
    });

    it('Covers: expected false - unsolved row', function() { 

        console.log("KD_1_1_1", SOLVED_KD_1_1_1.toString());

        const emptyRow: Puzzle = removeStars(SOLVED_KD_1_1_1, [[0, 1], [0, 4]]);
        assert(!emptyRow.isSolved(), "Empty to row should mean puzzle is unsolved.");

        const overflowingRow: Puzzle = addStars(SOLVED_KD_1_1_1, [[0, 0]]);
        assert(!overflowingRow.isSolved(), "Row with too many stars should mean puzzle is unsolved.");

    });

    it('Covers: expected false - unsolved column', function() { 
        throw new Error('Not implemented');
    });

    it('Covers: expected false - unsolved region', function() { 
        throw new Error('Not implemented');
    });
})



    
