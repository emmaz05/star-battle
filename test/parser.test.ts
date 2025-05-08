import assert from 'assert';
import { Puzzle, Cell, CellState } from '../src/puzzle.js'
import { parsePuzzle } from '../src/parser.js';
import fs from 'fs';
// import { describe, it } from 'mocha';



const SMALL_GRID: Array<Cell> = [
    {row: 0, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 0, col: 1, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Star},
    {row: 0, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 1, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Star}, //
    {row: 1, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},//
    {row: 1, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},//
    {row: 2, col: 0, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 2, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
    {row: 2, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Star}
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

    it.only('THIS IS FOR U EMMA', function() { 
        const text = `10x10`
        const puzzle: Puzzle = parsePuzzle(text);
        console.log("OK");
        
    });

})