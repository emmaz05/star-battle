import assert from 'assert';
import { Puzzle, Cell, CellState } from '../src/puzzle.js';
// import { describe, it } from 'mocha';



const SMALL_GRID: Array<Cell> = [
    {row: 0, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 0, col: 1, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty},
    {row: 0, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 1, col: 0, regionId: 0, currentState: CellState.Star, expectedState: CellState.Empty}, //
    {row: 1, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},//
    {row: 1, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},//
    {row: 2, col: 0, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 2, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 2, col: 2, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty}
]


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
                {row: 0, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Empty},
                {row: 0, col: 0, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty},
                {row: 1, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Empty},
                {row: 1, col: 1, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty}
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
            if (cell.currentState === CellState.Empty) {
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
            if (cell.currentState === CellState.Star) {
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
            if (cell.currentState === CellState.Star) {
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
            if (cell.currentState === CellState.Empty) {
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
            if (cell.currentState === CellState.Empty) {
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
            if (cell.currentState === CellState.Star) {
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
            if (cell.currentState === CellState.Empty) {
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
            if (cell.currentState === CellState.Star) {
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
    //      - region with not exactly 2 stars

    it('Covers: expected true', function() { 
        throw new Error('Not implemented');
    });

    it('Covers: expected false - empty grid', function() { 
        throw new Error('Not implemented');
    });

    it('Covers: expected false - unsolved row', function() { 
        throw new Error('Not implemented');
    });

    it('Covers: expected false - unsolved column', function() { 
        throw new Error('Not implemented');
    });

    it('Covers: expected false - unsolved region', function() { 
        throw new Error('Not implemented');
    });
})
    
