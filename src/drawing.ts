
import { Puzzle, Cell } from './puzzle.js';
import { makePalette, Color, colorToHexColor } from './coloring/colors.js';
// example of how to draw a puzzle with regions!


import assert from 'node:assert';

const BOX_SIZE = 16;
const CELL_BORDER = 0.2;
const CELL_SIZE = 40; 
const STAR_RADIUS = 10;

// mapping of regions to their colors
const regionColors = new Map<number, Color>();



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
 * @param color to fill box background
 */
export function drawBox(canvas: HTMLCanvasElement, x: number, y: number, color: string): void {
    const context = canvas.getContext('2d');
    assert(context !== null, 'unable to get canvas drawing context');
    if (context !== null) {
    // save original context settings before we translate and change colors
    context.save();

    // translate the coordinate system of the drawing context:
    //   the origin of `context` will now be (x,y)
    context.translate(x, y);

    // draw the outer outline box centered on the origin (which is now (x,y))
    context.strokeStyle = 'black';
    context.lineWidth = CELL_BORDER;
    context.strokeRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // fill with a random semitransparent color
    context.fillStyle = color;
    context.fillRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // reset the origin and styles back to defaults
    context.restore();
    }
}
/**
 * draws a circle in the middle of the specified square on the grid
 * @param context 2d canvas context 
 * @param row row to draw on
 * @param col column to draw on
 */
export function drawStar(context: CanvasRenderingContext2D, row: number, col: number): void {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = row * CELL_SIZE + CELL_SIZE / 2;
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    context.fill();
}
/**
 * draws a circle in the middle of the specified square on the grid
 * @param context 2d canvas context 
 * @param row row to draw on
 * @param col column to draw on
 * @param board current state of board
 */
export function eraseStar(context: CanvasRenderingContext2D, row: number, col: number, board: Puzzle): void {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = row * CELL_SIZE + CELL_SIZE / 2;
    const cell = board.getCellAt(row, col);
    const cellColor = regionColors.get(cell.regionId);
    const WHITE_TONE = 255;
    const WHITE: Color = [WHITE_TONE, WHITE_TONE, WHITE_TONE];
    context.fillStyle = colorToHexColor(cellColor ?? WHITE);
    context.beginPath();
    context.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    context.fill();
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
 * Draw the black puzzle given the board state
 * @param board current state of the puzzle
 */
export function drawBlankBoard(board: Puzzle): void {

    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLElement|null = document.getElementById('canvas');
    if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }
    else{
    const OFFSET_X = 8;
    const OFFSET_Y = 8;
    const regions: Map<number, Array<Cell>> = board.getRegions();
    const GRAY_TONE = 200;
    const LIGHT_GRAY: Color = [GRAY_TONE,GRAY_TONE,GRAY_TONE];
    // set up colors for each region
    let colorIdx = 0;
    const colorPalette = makePalette(LIGHT_GRAY, regions.size);
    regions.forEach((cellList, regId) => {
        let regionColor = regionColors.get(regId);
        if (regionColor === undefined){
            regionColors.set(regId, colorPalette[colorIdx]??LIGHT_GRAY);
            regionColor = regionColors.get(regId) ?? LIGHT_GRAY;
        }
        
        for (const cell of cellList){
            drawBox(
                canvas,
                (cell.col + 2*CELL_BORDER) * BOX_SIZE + OFFSET_X,
                (cell.row + 2*CELL_BORDER) * BOX_SIZE + OFFSET_Y,
                colorToHexColor(regionColor)
            );
        }
        colorIdx++;
      });
    }

    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}

// main();