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
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Server } from 'node:http';
import { parsePuzzle } from './parser.js';
import { drawPuzzle, cellCoords } from './drawing.js';


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
        // drawStar(this.canvas, row, col, this.currentState);
        // this.checkSolved();
        
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
        // this.checkSolved();
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


// start client stuff

async function sendRequest(): Promise<string> {
    try {
      const res = await fetch('http://localhost:8789/puzzle');
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.text();      // matches the JSON we now send
      return data;
    } catch (err) {
      console.error('Fetch failed: ' + err);
      return "failed";
    }
  }
// await sendRequest();

async function main(): Promise<void> {

    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLElement|null = document.getElementById('canvas');
    if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }
    // alert("yogurt");
    // // // await draw(canvas);
    // alert("yo");

    // when the user clicks on the drawing canvas...
    // canvas.addEventListener('click',  (event: MouseEvent) => {
    //     drawBox(canvas, event.offsetX, event.offsetY);
    // });
    // await sendRequest();
    
    // add initial instructions to the output area
    // const input = fs.readFileSync('puzzles/kd-1-1-1.starb', 'utf-8');
    // console.log(input);
    const blank1 = parsePuzzle(`# Star Battle Puzzles by KrazyDad, Volume 6, Book 31, Number 6
#  - higher book numbers should be more difficult!
# https://krazydad.com/starbattle/sfiles/STAR_R2_10x10_v6_b31.pdf
10x10
1,1  3,1  | 2,1
2,3  3,5  | 1,2 1,3 1,4 1,5 2,2 2,4 2,5
1,6  2,8  | 1,7 1,8 1,9 1,10 2,9 2,10
6,2  5,4  | 3,2 3,3 3,4 4,1 4,2 4,3 4,4 4,5 5,1 5,2 5,3 5,5 6,1 6,3 6,4 6,5 7,1 7,2 7,5 8,1 8,5 9,1 10,1
5,6  4,8  | 2,6 2,7 3,6 3,7 3,8 3,9 4,6 4,7 4,9 5,7 6,6 6,7 6,8 7,6
4,10 6,10 | 3,10 5,8 5,9 5,10 6,9 7,9 7,10 8,10 9,10 10,10
7,4  8,2  | 7,3 8,3 8,4 9,2 10,2
9,5  10,3 | 8,6 8,7 9,3 9,4 9,6 10,4 10,5
7,7  8,9  | 7,8 8,8 9,8
9,7  10,9 | 9,9 10,6 10,7 10,8

`);
const served = await sendRequest();
const blank = parsePuzzle(served);
    console.log(blank);
    const client = new Client(blank);

    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
    drawPuzzle(canvas, blank);
    // // when the user clicks on the drawing canvas...

    canvas.addEventListener('click', (event: MouseEvent) => {
        // drawBox(canvas, event.offsetX, event.offsetY);
        const [row, col] = cellCoords(canvas, event.offsetX, event.offsetY, client.getState());
        // alert(`row: ${row}, col: ${col}`);

        const cell = client.getState().getCellAt(row, col);

        if (cell.currentState === CellState.Empty) {
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

const PORT = 8789;
main();