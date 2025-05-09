/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into starb-client.html, see the `npm compile` and
//   `npm watch-client` scripts.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.

import assert from 'node:assert';
import { CellState, Puzzle } from './puzzle.js';
import { drawStar, eraseStar, printOutput } from './drawing.js';

import { Server } from 'node:http';
import { parsePuzzle } from './parser.js';
import { drawPuzzle, cellCoords } from './drawing.js';

const PUZZLE = `kd-1-1-1`;
const PORT = 8789;

/**
 * Puzzle to request and play.
 * Project instructions: this constant is a [for now] requirement in the project spec.
 */

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

    private currentState: Puzzle;

    /**
     * Creates a new client for the game.
     * @param blankPuzzle empty puzzle board
     */
    public constructor(blankPuzzle: Puzzle) {
        this.currentState = blankPuzzle;
        this.checkRep();
    }

    /**
     * Checks the representation invariant of the client
     */
    private checkRep(): void {
        assert(true);
    }

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

    }

    /**
     * @returns true if puzzle is solved
     */
    public checkSolved(): boolean {
        return this.currentState.isSolved();
    }

    /**
     * @returns the current puzzle state
     */
    public getState(): Puzzle {
        return this.currentState;
    }

}


// start client stuff

/**
 * Sends a request to the server for the text of a blank puzzle
 * @returns the string representing the requested empty puzzle if possible, throws error otherwise
 */
async function sendRequest(): Promise<string> {
    try {
      const response = await fetch(`http://localhost:${PORT}/puzzle/${PUZZLE}`);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.text();      // puzzle text data
      return data;
    } catch (err) {
      console.error('Fetch failed: ' + err);
      throw new Error("Fetch failed: " + err);
    }
  }


/**
 * Entry point into client
 */
async function main(): Promise<void> {

    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLElement|null = document.getElementById('canvas');
    if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }

    // load puzzle and build client from server
    const puzzleText = await sendRequest();
    console.log(puzzleText);
    const blankPuzzle = parsePuzzle(puzzleText);
    console.log(blankPuzzle);
    const client = new Client(blankPuzzle);

    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
    drawPuzzle(canvas, blankPuzzle);
    
    // when the user clicks on the drawing canvas...
    canvas.addEventListener('click', (event: MouseEvent) => {
        // drawBox(canvas, event.offsetX, event.offsetY);
        const [row, col] = cellCoords(canvas, event.offsetX, event.offsetY, client.getState());
        // alert(`row: ${row}, col: ${col}`);

        const cell = client.getState().getCellAt(row, col);

        if (cell.state === CellState.Empty) {
            client.addStar(row, col);
            drawStar(canvas, row, col, client.getState());
        } else {
            client.removeStar(row, col);
            eraseStar(canvas, row, col, client.getState());
        }
        
        if (client.checkSolved()) printOutput(outputArea, 'YOU HAVE JUST SOLVED THE PUZZLE. >:)))');
        // eraseStar(canvas, row, col, puzzle);
        // drawCell(canvas, row, col, puzzle);
    });
}

void main();