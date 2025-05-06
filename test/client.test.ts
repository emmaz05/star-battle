import assert from 'assert';
import { Client } from '../src/client.js';

describe('Client', function () {
    /**
     * Testing Strategy
     * 
     * constructor:
     *  
     * request:
     *  partition on blankPuzzle:
     *      - blankPuzzle is different than current puzzle state
     *      - blankPuzzle is same as current puzzle state
     * 
     * addStar:
     *  partition on dimensions:
     *      - dimensions are in bounds
     *      - dimensions are out of bounds
     *  partition on square at row, col:
     *      - square at row, col has star
     *      - square at row, col is empty
     *      
     * removeStar:
     *  partition on dimensions:
     *      - dimensions are in bounds
     *      - dimensions are out of bounds
     *  partition on square at row, col:
     *      - square at row, col has star
     *      - square at row, col is empty
     * 
     * displayPuzzle:
     *  partition on puzzle:
     *      - puzzle is empty
     *      - puzzle is in progress
     *      - puzzle is solved
     * 
     * declareSolved:
     *  partition on puzzle:
     *      - puzzle is empty
     *      - puzzle is in progress
     *      - puzzle is solved
     */

    it('some partition', function() { 
        
    });
});