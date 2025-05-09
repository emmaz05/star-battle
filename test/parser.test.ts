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


/**
 * Tests for the Puzzle abstract data type
 */
describe('parsePuzzle()', function () {
    // Testing strategy:
    // Cover input space with partitions, and test inputs within each subdomain.
    //
    // Partitions:
    //  
    
    it(' ', function() { 
        assert(true);
    });

})