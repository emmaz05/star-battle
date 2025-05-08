/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into starb-client.html, see the `npm compile` and
//   `npm watch-client` scripts.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.

import assert from 'node:assert';
import { CellState, Puzzle } from './puzzle.js';
import { drawBlankBoard, drawStar, eraseStar, printOutput } from './drawing.js';


/**
 * Puzzle to request and play.
 * Project instructions: this constant is a [for now] requirement in the project spec.
 */
const PUZZLE = "kd-1-1-1";

// see example-page.ts for an example of an interactive web page

/**
 * Mutable Client ADT to manage puzzle state and operations
 */
export class Client {
    // Abstraction Function:
    //      AF(currentState) = a client in the progress of solving a puzzle with puzzle state currentState
    // Representation Invariant:
    //      true
    // Safety from Representation Exposure:
    //      The puzzle ADT is immutable so allowing outside access to currentState is safe from rep exposure
    //      outputArea and canvas are mutated purposefully to display the state of the puzzle, and the client has no access to either fields
    

    private currentState: Puzzle;
    // private readonly outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // private readonly canvas: HTMLCanvasElement;

    /**
     * Creates a new client for the game.
     * @param blankPuzzle empty puzzle board
     */
    public constructor(blankPuzzle: Puzzle) {
        this.currentState = blankPuzzle;
        // const canvas = document.getElementById('canvas');
        // if (!(canvas instanceof HTMLCanvasElement)) throw new Error('missing drawing canvas');
        // this.canvas = canvas;
        // drawBlankBoard(this.canvas, this.currentState);
        // printOutput(this.outputArea, `Click on a square on the board to add and remove stars`);
        this.checkRep();
    }

    /**
     * Checks the representation invariant of the client
     */
    private checkRep(): void {
        assert(true);
    }

    // /**
    //  * Request a blank puzzle for the client to work on
    //  * @param blankPuzzle blank puzzle state 
    //  */
    // public request(blankPuzzle: Puzzle): void{
    //     this.currentState = blankPuzzle;
    // }

    /**
     * Updates the current puzzle state by adding a star at a specified position, 0-indexed
     * 
     * @param row row of new star
     * @param col column of new star
     * @throws Error if the position is out of bounds or a non-integer, or if a star is already there
     */
    public addStar(row: number, col: number): void {
        if (row >= this.currentState.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentState.width || col < 0) throw new Error('column is out of bounds');
        if (!Number.isInteger(row) || !Number.isInteger(col)) throw new Error('row and col must be integers');
        if (!this.currentState.isEmptyAt(row, col)) throw new Error('star already exists here');
        this.currentState = this.currentState.addStar(row, col);
        // drawStar(this.canvas, row, col);
        this.checkSolved();
        
    }

    /**
     * Updates the current puzzle state by removing a star at a specified position, 0-indexed
     * 
     * @param row row of star to remove
     * @param col column of star to remove
     * @throws Error if the position is out of bounds or a non-integer, or if no star is there
     */
    public removeStar(row: number, col: number): void {
        if (row >= this.currentState.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentState.width || col < 0) throw new Error('column is out of bounds');
        if (!Number.isInteger(row) || !Number.isInteger(col)) throw new Error('row and col must be integers');
        if (this.currentState.isEmptyAt(row, col)) throw new Error('no star to remove');
        this.currentState = this.currentState.removeStar(row, col);
        // eraseStar(this.canvas, row, col, this.currentState);
        this.checkSolved();
    }

    /**
     * checks if the puzzle is solved, and if so will display 'Puzzle solved!' message in output area
     * @returns true if puzzle is solved
     */
    public checkSolved(): boolean {
        const solved = this.currentState.isSolved();
        // if (solved) {
        //     printOutput(this.outputArea, 'Puzzle solved! >:)');
        // }
        return solved;
    }

    /**
     * @returns the current puzzle state
     */
    public getState(): Puzzle {
        return this.currentState;
    }

}

