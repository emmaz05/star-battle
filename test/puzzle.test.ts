
import assert from 'assert';
import { Puzzle, Cell, CellState } from '../src/puzzle.js'
import { parsePuzzle } from '../src/parser.js';


// TESTING UTILITIES
// =================================================================================

/**
 * TESTING UTILITY
 * Used to add stars to the puzzle at all the specified locations
 * 
 * @param puzzle the puzzle to add stars to
 * @param positions all the row-col coordinates of where to add stars to
 * @returns a new puzzle with stars at all the previously empty specified locations
 */
function addStars(puzzle: Puzzle, positions: Array<[number, number]>): Puzzle {
    for (const [row, col] of positions) {
        puzzle = puzzle.addStar(row, col);
    }
    return puzzle;
}

/**
 * TESTING UTILITY
 * Used to remove stars from the puzzle at all the specified locations
 * 
 * @param puzzle the puzzle to remove stars from
 * @param positions all the row-col coordinates of where to remove stars from
 * @returns a new puzzle with empty spots at all the previously starred specified locations
 */
function removeStars(puzzle: Puzzle, positions: Array<[number, number]>): Puzzle {
    for (const [row, col] of positions) {
        puzzle = puzzle.removeStar(row, col);
    }
    return puzzle;
}


// SOME CONSTANT PUZZLES
// =================================================================================

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
];

const SMALL_PUZZLE: Puzzle = new Puzzle(3, 3, SMALL_GRID);

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


// =================================================================================


/**
 * Tests for the Puzzle abstract data type
 */
describe('Puzzle: constructor()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
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
        } catch (e) { }

        try {
            const puzzle: Puzzle = new Puzzle(-4, 6, SMALL_GRID);
            assert(false, "Expected error when creating a board with negative width was not thrown.");
        } catch (e) { }
    });

    it('Covers: invalid height (height <= 0)', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(8, 0, SMALL_GRID);
            assert(false, "Expected error when creating a board with zero height was not thrown.");
        } catch (e) { }

        try {
            const puzzle: Puzzle = new Puzzle(3, -3, SMALL_GRID);
            assert(false, "Expected error when creating a board with negative height was not thrown.");
        } catch (e) { }
    });

    it('Covers: cells.length !== width * height', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(8, 9, SMALL_GRID);
            assert(false, "Expected error when width * height != cells.length was not thrown.");
        } catch (e) { }
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
        } catch (e) { }
    });

    it('Covers: valid size and cells provided', function() { 
        try {
            const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID); 
        }  catch (e) {
            assert(false, `Ran into error ${e} when creating a puzzle grid that should have no problems.`)
        }
    });

})

describe('Puzzle: isEmptyAt()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - output: expected true, expected false
    
    
    it('Covers: invalid row index', function() { 
        
        const puzzle: Puzzle = SMALL_PUZZLE;
        
        try {
            const isEmpty = puzzle.isEmptyAt(3, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const isEmpty = puzzle.isEmptyAt(-4, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const isEmpty = puzzle.isEmptyAt(0, 4);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const isEmpty = puzzle.isEmptyAt(2, -2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }
    });

    it('Covers: valid coords, cell IS empty', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                assert(
                    puzzle.isEmptyAt(cell.row, cell.col), 
                    `Expected true for empty cell (${cell.row}, ${cell.col}) but got false.`
                );
            }
        }
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        
        const puzzle: Puzzle = SMALL_PUZZLE;

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
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - output: expected true, expected false
    
    
    it('Covers: invalid row index', function() { 
        
        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const isEmpty = puzzle.hasStarAt(3, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) { }

        try {
            const isEmpty = puzzle.hasStarAt(-4, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.")
        } catch (e) { }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const isEmpty = puzzle.hasStarAt(0, 4);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const isEmpty = puzzle.hasStarAt(2, -2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }
    });

    it('Covers: valid coords, cell has star', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Star) {
                assert(
                    puzzle.hasStarAt(cell.row, cell.col), 
                    `Expected true for star cell (${cell.row}, ${cell.col}) but got false.`
                );
            }
        }
    });

    it('Covers: valid coords, cell does not have star', function() { 
        
        const puzzle: Puzzle = SMALL_PUZZLE;

        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                assert(
                    !puzzle.hasStarAt(cell.row, cell.col), 
                    `Expected false for empty cell (${cell.row}, ${cell.col}) but got true.`
                );
            }
        }
    });
})

describe('Puzzle: addStar()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star


    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
        
        try {
            const newPuzzle: Puzzle = puzzle.addStar(7, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const newPuzzle: Puzzle = puzzle.addStar(-2, 0);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const newPuzzle: Puzzle = puzzle.addStar(0, 3);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const newPuzzle: Puzzle = puzzle.addStar(2, -1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: valid coords, cell IS empty', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
        for (const cell of SMALL_GRID) {
            if (cell.state === CellState.Empty) {
                const newPuzzle: Puzzle = puzzle.addStar(cell.row, cell.col);
                assert(
                    newPuzzle.hasStarAt(cell.row, cell.col), 
                    `Expected true for empty cell (${cell.row}, ${cell.col}) but got false.`
                );
            }
        }
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
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
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star

    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
        
        try {
            const newPuzzle: Puzzle = puzzle.removeStar(7, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const newPuzzle: Puzzle = puzzle.removeStar(-2, 0);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const newPuzzle: Puzzle = puzzle.removeStar(0, 3);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const newPuzzle: Puzzle = puzzle.removeStar(2, -1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: valid coords, cell IS empty', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
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
        const puzzle: Puzzle = SMALL_PUZZLE;
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
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds

    it('Covers: invalid row index', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
        
        try {
            const cell: Cell = puzzle.getCellAt(4, 2);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const cell: Cell = puzzle.getCellAt(-1, 1);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

    });

    it('Covers: invalid column index', function() { 

        const puzzle: Puzzle = SMALL_PUZZLE;
        try {
            const cell: Cell = puzzle.getCellAt(0, 5);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }

        try {
            const cell: Cell = puzzle.getCellAt(0, -5);
            assert(false, "Expected error when row index is not in bounds was not thrown.");
        } catch (e) { }
    });

    it('Covers: valid coordinates', function() { 
        const puzzle: Puzzle = SMALL_PUZZLE;
        for (const cell of SMALL_GRID) {
            const returnedCell: Cell = puzzle.getCellAt(cell.row, cell.col);
            assert.deepEqual(
                returnedCell,
                cell,
                `Expected ${JSON.stringify(cell)} but got ${JSON.stringify(returnedCell)}`
            );
        }
    });

})

describe('Puzzle: isSolved()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - on outputs: true, false
    //  - FOR FALSE OUTPUTS, FALSE BECAUSE:
    //      - empty puzzle
    //      - unsolved rows
    //      - unsolved columns
    //      - unsolved regions
    //      - neighboring stars

    it('Covers: expected true', function() { 
        assert(SOLVED_KD_1_1_1.isSolved(), "Expected solved puzzle to be solved.");
    });

    it('Covers: expected false - empty grid', function() { 
        assert(!KD_1_1_1.isSolved(), "Expected empty grid to be unsolved.");
    });

    it('Covers: expected false - unsolved rows', function() { 
        let puzzle: Puzzle = addStars(SOLVED_KD_1_1_1, [[0, 8]]);
        puzzle = removeStars(puzzle, [[1, 8]]);

        assert(!puzzle.isSolved(), "Expected unsolved rows to produce unsolved puzzle.");
    });

    it('Covers: expected false - unsolved columns', function() { 
        let puzzle: Puzzle = addStars(SOLVED_KD_1_1_1, [[0, 2]]);
        puzzle = removeStars(puzzle, [[0, 1]]);

        assert(!puzzle.isSolved(), "Expecxted unsolved columns to produce unsolved puzzle.");
    });

    it('Covers: expected false - unsolved region', function() { 
        let puzzle: Puzzle = addStars(SOLVED_KD_1_1_1, [[9, 8], [1, 9]]);
        puzzle = removeStars(puzzle, [[9, 9], [1, 8]]);

        assert(!puzzle.isSolved(), "Expected unsolved regions to produce unsolved puzzle.");
    });

    it('Covers: expected false - neighboring stars', function() { 
        let puzzle: Puzzle = addStars(SOLVED_KD_1_1_1, [[8, 5], [9, 2]]);
        puzzle = removeStars(puzzle, [[8, 2], [9, 5]]);

        assert(!puzzle.isSolved(), "Expected unsolved regions to produce unsolved puzzle.");
    });
    
})

describe('Puzzle: getRegions()', function() {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    // - number of regions: 1, > 1

    it('Covers: number of regions = 1', function() { 
        const SINGLE_REGION: Array<Cell> = [
            {row: 0, col: 0, regionId: 0, state: CellState.Empty},
            {row: 0, col: 1, regionId: 0, state: CellState.Star},
            {row: 0, col: 2, regionId: 0, state: CellState.Empty},
            {row: 1, col: 0, regionId: 0, state: CellState.Star}, //
            {row: 1, col: 1, regionId: 0, state: CellState.Empty},//
            {row: 1, col: 2, regionId: 0, state: CellState.Empty},//
            {row: 2, col: 0, regionId: 0, state: CellState.Empty},
            {row: 2, col: 1, regionId: 0, state: CellState.Empty},
            {row: 2, col: 2, regionId: 0, state: CellState.Star}
        ];

        const puzzle: Puzzle = new Puzzle(3, 3, SINGLE_REGION);
        const regionMap: Map<number, Array<Cell>> = puzzle.getRegions();
        assert.equal(regionMap.size, 1, "Expected only one region in the map.");

        const region = regionMap.get(0) ?? assert.fail("Could not get region 0.");
        for (const cell of puzzle.getGrid()) {
            assert(region.includes(cell), `Expected cell (${cell.row}, ${cell.col}) to be in region 0`);
        }

    });

    it('Covers: number of regions > 1', function() { 
        const regionMap: Map<number, Array<Cell>> = SOLVED_KD_1_1_1.getRegions();
        for (const cell of SOLVED_KD_1_1_1.getGrid()) {
            const region = regionMap.get(cell.regionId);
            if (region) {
                assert(region.includes(cell), `Expected cell (${cell.row}, ${cell.col}) to be in region ${cell.regionId}`);
            } else {
                assert(false, `Expected cell (${cell.row}, ${cell.col}) to be in region ${cell.regionId}`);
            }
        }
    });
})

describe('Puzzle: getGrid()', function() {
    // Testing strategy:
    // because of how simple this function is, just
    // make sure the output produced is correct for
    // a small and big board

    it('Make sure grid is in row-major order and with correct lenth', function() { 
        
        const smallPuzzle: Puzzle = SMALL_PUZZLE;
        for(const cell of smallPuzzle.getGrid()) {
            assert(SMALL_GRID.includes(cell), "Cell in grid not returned by getGrid");
        }

        const largePuzzle: Puzzle = KD_1_1_1;
        const largeGrid: Array<Cell> = largePuzzle.getGrid();
        assert(largeGrid.length === 100, "Incorrect number of cells in returned grid")
        for (let i = 0; i < 100; i++) {
            const ithCell: Cell = largeGrid[i] ?? assert.fail("Index out of range");
            assert(ithCell.row === Math.floor(i/10), "grid does not follow row-major order");
            assert(ithCell.col === i % 10, "grid does not follow row-major order");
        }

    });

    
})

describe('Puzzle: toString()', function() {
    // Testing strategy:
    // because of how simple this function is - and the fact is
    // used mainly for debugging - run it against some grids and
    // verify answers are what is expected

    it('Make sure string representation is sensible', function() { 
        const expectedSmall = `
[ ][X][ ]
[X][ ][ ]
[ ][ ][X]`
        assert(SMALL_PUZZLE.toString() === expectedSmall, "Puzzle grid string representation for small puzzle not as expected");

        const expectedKD111 = `
[ ][X][ ][ ][X][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][X][ ][X][ ]
[ ][X][ ][X][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][X][ ][X]
[ ][ ][ ][X][ ][X][ ][ ][ ][ ]
[X][ ][ ][ ][ ][ ][ ][X][ ][ ]
[ ][ ][X][ ][X][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][X][ ][X][ ]
[X][ ][X][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][X][ ][ ][ ][X]`;
        assert(SOLVED_KD_1_1_1.toString() === expectedKD111, "Puzzle grid string representation for solved KD-1-1-1 not as expected");
    });

})
