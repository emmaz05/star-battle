import assert from 'assert';

/**
 * Tests for the Puzzle abstract data type
 */
describe('Puzzle', function () {
    /**
     * Testing strategy
     * 
     *  constructor:
     *      partition on TODO: determine when construction method of puzzle is determines
     * 
     *  isSolved:
     *      partition on state of puzzle:
     *          - puzzle is solved
     *          - puzzle is empty 
     *          - puzzle is partially solved
     * 
     *  getRegion:
     *      partition on row:
     *          - row = 0
     *          - row = size - 1
     *          - 0 < row < size - 1
     *          - row is out of bounds
     *      partition on col:
     *          - col = 0
     *          - col = size - 1
     *          - 0 < col < size - 1
     *          - col is out of bounds
     * 
     *  getState:
     *      partition on row:
     *          - row = 0
     *          - row = size - 1
     *          - 0 < row < size - 1
     *          - row is out of bounds
     *      partition on col:
     *          - col = 0
     *          - col = size - 1
     *          - 0 < col < size - 1
     *          - col is out of bounds
     *      partition on state at row, col:
     *          - state is Empty
     *          - state is Dot
     *          - state is Star
     *          - invalid row/col
     */
})