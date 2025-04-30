/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into example-page.html, see the `npm watch-example` script.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.

import assert from 'node:assert';

const BOX_SIZE = 16;
const GRID_SIZE = 10;
const CELL_SIZE = 40; 
const STAR_RADIUS = 10;

const stars: boolean[][] = Array.from({length: GRID_SIZE}, () => Array<boolean>(GRID_SIZE).fill(false)); // replace with puzzle/client adt later

/**
 * draw the grid for the game board
 * @param canvas canvas element
 * @param context 2d canvas context
 */
function drawGrid(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    context.strokeStyle = 'black';
    for (let i = 0; i <= GRID_SIZE; i++) {
        const pos = i * CELL_SIZE;
        context.beginPath();
        context.moveTo(0, pos);
        context.lineTo(GRID_SIZE * CELL_SIZE, pos);
        context.stroke();
        context.beginPath();
        context.moveTo(pos, 0);
        context.lineTo(pos, GRID_SIZE * CELL_SIZE);
        context.stroke();
    }
}

/**
 * draws a circle in the middle of the specified square on the grid
 * @param context 2d canvas context 
 * @param row row to draw on
 * @param col column to draw on
 */
function drawStar(context: CanvasRenderingContext2D, row: number, col: number): void {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = row * CELL_SIZE + CELL_SIZE / 2;
    context.fillStyle = 'pink';
    context.beginPath();
    context.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    context.fill();
}

/**
 * clears the cell at the specified square on the grid
 * @param context 2d canvas context
 * @param row row to clear
 * @param col column to clear
 */
function clearCell(context: CanvasRenderingContext2D, row: number, col: number): void {
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;
    context.clearRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2); // keep the grid lines
}

/**
 * gets the row and column of the board in which the event occurred
 * @param event mouse event that occurred
 * @returns [row, column] of the mouse event
 */
function getCoords(event: MouseEvent): [number, number] {
    const target = event.target;
    if (!(target instanceof HTMLCanvasElement)) throw new Error;
    const canvas = target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    return [row, col];
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

    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLElement|null = document.getElementById('canvas');
    if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }

    canvas.width = CELL_SIZE * GRID_SIZE;
    canvas.height = CELL_SIZE * GRID_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('invalid context');

    drawGrid(canvas, ctx);

    canvas.addEventListener('click', (event: MouseEvent) => {
        const [row, col] = getCoords(event);
        if (!(row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE)) {
            const starRow = stars[row];
            if (starRow !== undefined) {
                if (starRow[col] === true) {
                    clearCell(ctx, row, col);
                    starRow[col] = false;
                } else {
                    drawStar(ctx, row, col);
                    starRow[col] = true;
                }
            }
            
        }
        
    });
}

main();
