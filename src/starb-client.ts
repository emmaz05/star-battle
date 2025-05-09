/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into starb-client.html, see the `npm compile` and
//   `npm watch-client` scripts.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.

import assert from 'node:assert';
import { CellState} from './puzzle.js';
import { drawStar, eraseStar, printOutput } from './drawing.js';

import { Client } from './client.js';
import { parsePuzzle } from './parser.js';
import { drawPuzzle, cellCoords } from './drawing.js';

/**
 * Puzzle to request and play.
 * Project instructions: this constant is a [for now] requirement in the project spec.
 */
const PUZZLE = `kd-1-1-1`;
const PORT = 8789;

// see example-page.ts for an example of an interactive web page

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

await main();