import assert from 'assert';
import { Client } from '../src/starb-client.js';
import { Cell, CellState, Puzzle } from '../src/puzzle.js';
import { parsePuzzle } from '../src/parser.js';
import fs from 'fs';

const input = fs.readFileSync('./puzzles/kd-1-1-1.starb', 'utf-8');
const blank = parsePuzzle(input);

describe('Client', function () {
    /**
     * Testing Strategy
     * 
     * addStar:
     *  partition on dimensions:
     *      - dimensions are legal
     *      - dimensions are illegal
     *  partition on square at row, col:
     *      - square at row, col has star
     *      - square at row, col is empty
     *      
     * removeStar:
     *  partition on dimensions:
     *      - dimensions are legal
     *      - dimensions are illegal
     *  partition on square at row, col:
     *      - square at row, col has star
     *      - square at row, col is empty
     * 
     * checkSolved:
     *  partition on puzzle:
     *      - puzzle is empty
     *      - puzzle is in progress
     *      - puzzle is solved
     */

    
    it('addStar: dimensions are legal, square at row, col is empty; removeStar: dimensions are legal, square at row, col has star; checkSolved: puzzle is in progress', function() { 
        const client = new Client(blank);
        client.addStar(0, 8);
        const state1 = client.getState();
        assert(state1.hasStarAt(0, 8), 'new state should have star at the selected spot');
        state1.addStar(1, 1);
        assert(!state1.hasStarAt(1,1), 'puzzle state should be immutable');

        client.removeStar(0, 2);
        const state2 = client.getState();
        assert(!state2.hasStarAt(0, 2), 'star should be removed');
        assert(state1.hasStarAt(0, 2), 'future mutation of client should not affect previous state');
        assert.strictEqual(client.checkSolved(), false, 'puzzle is still in progress');
    }); 

    it('addStar: dimensions are illegal; removeStar: dimensions are illegal; checkSolved: puzzle is empty', function() { 
        const client = new Client(blank);
        assert.strictEqual(client.checkSolved(), false, 'blank puzzle is not solved');
        assert.throws(() => client.addStar(-1, 1), 'no negative dimensions');
        assert.throws(() => client.addStar(0, 3), 'row and col should be within dimension bounds');
        assert.throws(() => client.addStar(1, 1.2), 'dimensions must be integers');
        const state1 = client.getState();
        for (let x = 0; x < 3; x += 1) {
            for (let y = 0; y < 3; y += 1) {
                assert(!state1.hasStarAt(x, y), 'board should still be empty');
            }
        }

        assert.throws(() => client.removeStar(0, -1), 'no negative dimensions');
        assert.throws(() => client.removeStar(6, 2), 'row and col should be within dimension bounds');
        assert.throws(() => client.removeStar(2, 0.3), 'dimensions must be integers');
        const state2 = client.getState();
        for (let x = 0; x < 3; x += 1) {
            for (let y = 0; y < 3; y += 1) {
                assert(!state2.hasStarAt(x, y), 'board should still be empty');
            }
        }
        assert.strictEqual(client.checkSolved(), false, 'blank puzzle is not solved');
    }); 

    it('addStar: dimensions are in bounds, square at row, col has star; removeStar: dimensions are in bounds, square at row, col is empty; checkSolved: puzzle is solved', function() { 
        const client = new Client(blank);
        client.addStar(1, 1);
        assert.throws(() => client.addStar(1, 1), 'cannot add star if that square already has a star');
        const state1 = client.getState();
        assert(state1.hasStarAt(1,1), 'previous star should still exist');

        client.addStar(1, 0);
        assert.throws(() => client.removeStar(2, 0))
        const state2 = client.getState();
        assert(!state2.hasStarAt(0, 2), 'star should be removed');
        assert(state1.hasStarAt(0, 2), 'future mutation of client should not affect previous state');
        assert.strictEqual(client.checkSolved(), false, 'puzzle is still in progress');
    }); 
});