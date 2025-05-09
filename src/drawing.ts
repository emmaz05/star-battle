
import { Puzzle, Cell, CellState } from './puzzle.js';
import { makePalette, Color, colorToHexColor } from './coloring/colors.js';
// example of how to draw a puzzle with regions!


import assert from 'node:assert';

const BOX_SIZE = 16;
const CELL_BORDER = 0.2;
const HUE_DEGREES = 360;
const HUE_SECTION = 60;
const PIXEL_MAX = 255;

const STAR_RADIUS = 5;
const STAR_COLOR = 'black';

// mapping of regions to their colors
const regionColors = new Map<number, Color>();


// SHAPE DRAWING
// ==========================================================================

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
 * Draw a circle at the specified canvas space x-y coordinates
 * 
 * @param canvas canvas to draw on
 * @param x x coordinate of center of circle
 * @param y y coordinate of center of circle
 * @param color color to fill circle background
 * @param radius positive number describing the circle radius
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


// COORDINATE SPACE CONVERSION UTILITIES
// ==========================================================================

/**
 * Converts x-y canvas space coordinates to the corresponding row-col puzzle grid
 * space coordinates.
 * 
 * @param canvas the canvas to draw on
 * @param x the x coordinate in canvas space
 * @param y the y coordinate in canvas
 * @param puzzle the puzzle whose grid space to convert to
 * @returns the row-col puzzle grid space coordinates corresponding to (x, y)
 * in canvas space
 */
export function gridCoords(canvas: HTMLCanvasElement, x: number, y: number, puzzle: Puzzle): [number, number] {
    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;

    const row = Math.min(Math.max(Math.floor(y / CELL_HEIGHT), 0), puzzle.height - 1);
    const col = Math.min(Math.max(Math.floor(x / CELL_WIDTH), 0), puzzle.width - 1);

    return [ row, col ];
   
}


/**
 * Converts row-col puzzle grid space coordinates to the corresponding x-y canvas
 * space coordinates.
 * 
 * @param canvas the canvas to draw on
 * @param row the row coordinate in puzzle grid space
 * @param col the col coordinate in puzzle grid space
 * @param puzzle the puzzle whose grid space to convert to
 * @returns the x-y canvas space coordinates corresponding to (row, col)
 * in canvas space
 */
export function canvasCoords(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle): [number, number] {
    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;
    
    const x = col * CELL_WIDTH + CELL_WIDTH / 2;
    const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;
    return [x, y];
}


// STAR DRAWING UTILITIES
// ==========================================================================

/**
 * Erases a drawn star at the corresponding row-col coordinates
 * 
 * @param canvas the canvas to draw on
 * @param row the row coordinate of the cell to de-star (puzzle grid space)
 * @param col the column coordinate of the cell to de-star (puzzle grid space)
 * @param puzzle the puzzle used in the drawing
 */
export function eraseStar(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle): void {

    const regionId = puzzle.getCellAt(row, col).regionId;
    const regions: Map<number, Array<Cell>> = puzzle.getRegions();
    const hue = (HUE_DEGREES / regions.size) * regionId;
    const backgroundColor = hueToRGB(hue);

    const [x, y]: [number, number] = canvasCoords(canvas, row, col, puzzle);
    drawCircle(canvas, x, y, backgroundColor, STAR_RADIUS);
}

/**
 * Draws a star at the corresponding row-col coordinates
 * 
 * @param canvas the canvas to draw on
 * @param row the row coordinate of the cell to star (puzzle grid space)
 * @param col the column coordinate of the cell to star (puzzle grid space)
 * @param puzzle the puzzle used in the drawing
 */
export function drawStar(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle): void {

    const [x, y]: [number, number] = canvasCoords(canvas, row, col, puzzle);
    drawCircle(canvas, x, y, STAR_COLOR, STAR_RADIUS);
}


// PUZZLE GRID DRAWING
// ==========================================================================

/**
 * Draws a single cell of the grid, such that its row-col coordinates in Puzzle grid space
 * get converted to the relevant x-y coordinates in canvas space.
 * 
 * @param canvas the canvas to draw on
 * @param row the row coordinate of the cell (puzzle grid space)
 * @param col the column coordinate of the cell (puzzle grid space)
 * @param puzzle the puzzle this cell belongs to
 * @param color the color to use for the cell background
 */
export function drawCell(canvas: HTMLCanvasElement, row: number, col: number, puzzle: Puzzle, color: string): void {
    
    const CELL_WIDTH = canvas.width / puzzle.width;
    const CELL_HEIGHT = canvas.height / puzzle.height;
    const x = col * CELL_WIDTH + CELL_WIDTH / 2;
    const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;

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
        context.strokeStyle = 'black';
        context.strokeRect(-CELL_WIDTH / 2, -CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);

        context.restore();
    }
}

/**
 * Draws the grid of the a puzzle, with distinct colors for each region.
 * 
 * @param canvas the canvas to draw on 
 * @param puzzle the puzzle to fit onto the canvas
 */
export function drawGrid(canvas: HTMLCanvasElement, puzzle: Puzzle): void {
    const regions: Map<number, Array<Cell>> = puzzle.getRegions();
    const dhue = HUE_DEGREES / regions.size;

    for (const [regionId, cells] of regions.entries()) {
        const hue = regionId * dhue;
        const color = hueToRGB(hue);
        
        for (const cell of cells) {
            drawCell(canvas, cell.row, cell.col, puzzle, color);
        }
    }
}

/**
 * Draws the entire puzzle grid state, including regions and stars.
 * 
 * @param canvas the canvas to draw on 
 * @param puzzle the puzzle to fit onto the canvas
 */
export function drawPuzzle(canvas: HTMLCanvasElement, puzzle: Puzzle): void {
    drawGrid(canvas, puzzle);
    for (const cell of puzzle.getGrid()) {
        if (cell.state === CellState.Star) { drawStar(canvas, cell.row, cell.col, puzzle); }
    }
}

/**
 * Converts a hue value to an RGB color string
 * 
 * @param hue the hue value (0-360)
 * @returns the RGB color string in hex format
 */
export function hueToRGB(hue: number): string {
    // Ensure hue wraps around if it's out of bounds
    hue = hue%HUE_DEGREES;

    // Convert HSL (hue, 100%, 50%) to RGB
    const c = 1; // chroma = (1 - |2L - 1|) * S, with L = 0.5, S = 1
    const x = c * (1 - Math.abs((hue / HUE_SECTION) % 2 - 1));
    const m = 0; // we add this later but since L=0.5 and c=1, m=0

    let r:number , g: number, b: number;

    if (hue < HUE_SECTION)         [r, g, b] = [c, x, 0];
    else if (hue < 2 * HUE_SECTION)[r, g, b] = [x, c, 0];
    else if (hue < 3 * HUE_SECTION)[r, g, b] = [0, c, x];
    else if (hue < 4 * HUE_SECTION)[r, g, b] = [0, x, c];
    else if (hue < 5 * HUE_SECTION)[r, g, b] = [x, 0, c];
    else                           [r, g, b] = [c, 0, x];;
    // Convert to 0–255 and return as hex color string
    return colorToHexColor([
        Math.round((r + m) * PIXEL_MAX),
        Math.round((g + m) * PIXEL_MAX),
        Math.round((b + m) * PIXEL_MAX)
    ]);
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