import assert from 'assert';
import { Puzzle, Cell, CellState } from '../src/puzzle.js'
import { parsePuzzle } from '../src/parser.js';
import fs from 'fs';
// import { describe, it } from 'mocha';


/**
 * Tests for the Puzzle abstract data type
 */
describe('Parser: parsePuzzle()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  - on input string: valid file grammar, invalid formatting

    it('Covers: valid formatting', function () {
        const inputString = `10x10
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
`;

        const parsedPuzzle: Puzzle = parsePuzzle(inputString);

        assert(parsedPuzzle.height === 10, "Incorrect height parsed");
        assert(parsedPuzzle.width === 10, "Incorrect width parsed");
        assert(parsedPuzzle.getGrid().length === 100, "Incorrect number of cells in grid");

        const regions: Map<number, Array<Cell>> = parsedPuzzle.getRegions();

        const amountsPerRegion: Array<number> = [16, 14, 3, 5, 19, 7, 11, 4, 5, 16];
        for (let regionId = 0; regionId < regions.size; regionId++) {
            const expectedLength = amountsPerRegion[regionId] ?? assert.fail("Skipped index in region IDs");
            const regionCells = regions.get(regionId) ?? assert.fail("Skipped index in region IDs");
            assert(regionCells.length === expectedLength, "Wrong number of cells in region.")
        }

    });

    it('Covers: invalid formatting', function () {

        const invalidInput1 = `I AM A PUZZLE FILE`;
        try {
            const puzzle = parsePuzzle(invalidInput1);
            assert(false, "Should throw error when parsing comepletely invalid string");
        } catch (e) {}

        const invalidInput2 = "10x10\n2,3 4,5";
        try {
            const puzzle = parsePuzzle(invalidInput2);
            assert(false, "Should throw error when parsing incomplete board file");
        } catch (e) {}

        const invalidInput3 = "10x10\n2,3 4,5 | 5,4 3,3 5,2 5,2 1,45\n2,3 4,2 2,3 2,4 0324,3";
        try {
            const puzzle = parsePuzzle(invalidInput3);
            assert(false, "Should throw error when parsing incomplete board file");
        } catch (e) {}

        const invalidInput4 = "10x10\n2,3 4,5 | 5,4 3,3 5,2 5,2 1,45\n2,3 4,2 2,3 2,4 0324,3\n2,3 4,5 | 5,4 3,3 5,2 5,2 1,45";
        try {
            const puzzle = parsePuzzle(invalidInput4);
            assert(false, "Should throw error when parsing incomplete board file");
        } catch (e) {}
    });

})