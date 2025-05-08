/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into example-page.html, see the `npm watch-example` script.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.

import assert from 'node:assert';
import { drawStar, drawCircle, cellCoords, eraseStar } from './drawing.js';
import { Cell, CellState } from './puzzle.js';
import { Puzzle } from './puzzle.js';

const BOX_SIZE = 16;

// categorical colors from
// https://github.com/d3/d3-scale-chromatic/tree/v2.0.0#schemeCategory10
const COLORS: Array<string> = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
];

// semitransparent versions of those colors
const BACKGROUNDS = COLORS.map((color) => color + '60');

/**
 * Draw a black square filled with a random color.
 * 
 * Note: this function is designed to draw on a <canvas> element in the browser,
 *   but we can adjust its signature so that it can be tested with Mocha in Node.
 *   See "How to test: canvas drawing" on the *Testing* page of the project handout.
 * 
 * @param canvas canvas to draw on
 * @param x x position of center of box
 * @param y y position of center of box
 */
function drawBox(canvas: HTMLCanvasElement, x: number, y: number): void {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');

    // save original context settings before we translate and change colors
    context.save();

    // translate the coordinate system of the drawing context:
    //   the origin of `context` will now be (x,y)
    context.translate(x, y);

    // draw the outer outline box centered on the origin (which is now (x,y))
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.strokeRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // fill with a random semitransparent color
    context.fillStyle = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)] ?? assert.fail();
    context.fillRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // reset the origin and styles back to defaults
    context.restore();
}

/**
 * Print a message by appending it to an HTML element.
 * 
 * @param outputArea HTML element that should display the message
 * @param message message to display
 */
function printOutput(outputArea: HTMLElement, message: string): void {
    // append the message to the output area
    outputArea.innerText += message + '\n';

    // scroll the output area so that what we just printed is visible
    outputArea.scrollTop = outputArea.scrollHeight;
}



/**
 * Set up the example page.
 */
function main(): void {


    const SMALL_GRID: Array<Cell> = [
        {row: 0, col: 0, regionId: 0, currentState: CellState.Empty, expectedState: CellState.Empty},
        {row: 0, col: 1, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty},
        {row: 0, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},
        {row: 1, col: 0, regionId: 0, currentState: CellState.Star, expectedState: CellState.Empty}, //
        {row: 1, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},//
        {row: 1, col: 2, regionId: 1, currentState: CellState.Empty, expectedState: CellState.Empty},//
        {row: 2, col: 0, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
        {row: 2, col: 1, regionId: 2, currentState: CellState.Empty, expectedState: CellState.Empty},
        {row: 2, col: 2, regionId: 1, currentState: CellState.Star, expectedState: CellState.Empty}
    ];

    const puzzle: Puzzle = new Puzzle(3, 3, SMALL_GRID);






    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLElement|null = document.getElementById('canvas');
    if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }

    for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
            drawStar(canvas, row, col, puzzle);
        }
    }

    // when the user clicks on the drawing canvas...
    canvas.addEventListener('click', (event: MouseEvent) => {
        // drawBox(canvas, event.offsetX, event.offsetY);
        const [row, col] = cellCoords(canvas, event.offsetX, event.offsetY, puzzle);
        alert(`row: ${row}, col: ${col}`);
        // drawCircle(canvas, row, col, "red");
        eraseStar(canvas, row, col, puzzle);
    });

    


    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}

main();
