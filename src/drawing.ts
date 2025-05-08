
import { Puzzle, Cell } from './puzzle.js';
import { makePalette, Color, colorToHexColor } from './coloring/colors.js';
// example of how to draw a puzzle with regions!


import assert from 'node:assert';

const BOX_SIZE = 16;
const CELL_BORDER = 0.2;
const CELL_SIZE = 40; 
const STAR_RADIUS = 6;

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
 * Draw a circle at the specified coordinates
 * 
 * @param canvas canvas to draw on
 * @param x x coordinate of center of circle
 * @param y y coordinate of center of circle
 * @param color color to fill circle background
 */
export function drawCircle(canvas: HTMLCanvasElement, x: number, y: number, color: string, radius: number): void {
    const context = canvas.getContext('2d');
    assert(context !== null, 'unable to get canvas drawing context');
    if (context !== null) {
        context.save();

        // translate to (x, y) for drawing
        context.translate(x, y);

        // draw the circle
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI); // Circle centered at (0, 0) with radius BOX_SIZE/2
        context.fillStyle = color; // Fill color
        context.fill();

        context.lineWidth = CELL_BORDER;
        context.strokeStyle = color;
        context.stroke();

        context.restore();
    }
}

/**
 * Clamps the coordinates to the center of a cell in the grid
 * 
 * @param canvas the canvas to draw on
 * @param x the x coordinate to clamp
 * @param y the y coordinate to clamp
 * @param puzzle the puzzle whose grid to clamp to
 * @returns the clamped coordinates in row-col format (origin is top left)
 */
export function cellCoords(canvas: HTMLCanvasElement, x: number, y: number, puzzle: Puzzle): [number, number] {
    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;

    const row = Math.min(Math.max(Math.floor(y / CELL_HEIGHT), 0), puzzle.height - 1);
    const col = Math.min(Math.max(Math.floor(x / CELL_WIDTH), 0), puzzle.width - 1);

    return [ row, col ];
   
}

/**
 * draws a circle in the middle of the specified square on the grid
 * @param canvas canvas to draw on
 * @param row row to draw on
 * @param col column to draw on
 */
export function drawStar(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle): void {

    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;
    
    const x = col * CELL_WIDTH + CELL_WIDTH / 2;
    const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;

    drawCircle(canvas, x, y, 'black', STAR_RADIUS);
}

/**
 * Draws a cell of the puzzle at the specified row and column coordinates
 * 
 * @param canvas the canvas to draw on
 * @param row the row coordinate of the cell
 * @param col the column coordinate of the cell
 * @param puzzle the puzzle this cell belongs to
 * @param color the color of the cell to use
 */
export function drawCell(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle, color: string): void {
    
    // const cell: Cell = puzzle.getCellAt(row, col);
    
    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;
    const x = col * CELL_WIDTH + CELL_WIDTH / 2;
    const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;
    
    // const color = regionColors.get(puzzle.getCellAt(row, col).regionId);

    const context = canvas.getContext('2d');
    assert(context !== null, 'unable to get canvas drawing context');
    if (context !== null) {
        context.save();

        // Translate the origin to (x, y)
        context.translate(x, y);

        // Draw the rectangle centered on (0, 0)
        context.fillStyle = color;
        context.fillRect(-CELL_WIDTH / 2, -CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);

        context.lineWidth = CELL_BORDER;
        context.strokeStyle = color;
        context.strokeRect(-CELL_WIDTH / 2, -CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);

        context.restore();
    }
}

export function drawPuzzle(canvas: HTMLCanvasElement, puzzle: Puzzle): void {
    const regions: Map<number, Array<Cell>> = puzzle.getRegions();
    const dhue = 360 / regions.size;

    for ()

}


export function hueToRGB(hue: number): string {
    // Ensure hue wraps around if it's out of bounds
    hue = ((hue % 360) + 360) % 360;

    // Convert HSL (hue, 100%, 50%) to RGB
    const c = 1; // chroma = (1 - |2L - 1|) * S, with L = 0.5, S = 1
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = 0; // we add this later but since L=0.5 and c=1, m=0

    let r = 0, g = 0, b = 0;

    if (hue < 60)      [r, g, b] = [c, x, 0];
    else if (hue < 120)[r, g, b] = [x, c, 0];
    else if (hue < 180)[r, g, b] = [0, c, x];
    else if (hue < 240)[r, g, b] = [0, x, c];
    else if (hue < 300)[r, g, b] = [x, 0, c];
    else               [r, g, b] = [c, 0, x];

    // Convert to 0–255 and return as CSS rgb() string
    return `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`;
}




/**
 * draws a circle in the middle of the specified square on the grid
 * @param canvas canvas to draw on
 * @param row row to draw on
 * @param col column to draw on
 * @param board current state of board
 */
export function eraseStar(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle): void {

    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;
    
    const x = col * CELL_WIDTH + CELL_WIDTH / 2;
    const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;

    let color = regionColors.get(puzzle.getCellAt(row, col).regionId);
    if (color === undefined) { color = [255, 255, 255]; }

    drawCircle(canvas, x, y, colorToHexColor(color), STAR_RADIUS + 1);
}


/**
 * Print a message by appending it to an HTML element.
 * 
 * @param outputArea HTML element that should display the message
 * @param message message to display
 */
export function printOutput(outputArea: HTMLElement, message: string): void {
    // append the message to the output area
    outputArea.innerText += message + '\n';

    // scroll the output area so that what we just printed is visible
    outputArea.scrollTop = outputArea.scrollHeight;
}

/**
 * Draw the black puzzle given the board state
 * @param canvas canvas to draw on
 * @param board current state of the puzzle
 */
export function drawBlankBoard(canvas: HTMLCanvasElement, board: Puzzle): void {

    // // output area for printing
    // const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // // canvas for drawing
    // const canvas: HTMLElement|null = document.getElementById('canvas');
    // if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }
    // else{
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
            drawCell(
                canvas,
                (cell.col),
                (cell.row),
                board,
                colorToHexColor(regionColor)
            );
        }
        colorIdx++;
      });
    // }

    // add initial instructions to the output area
    // printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}

// main();