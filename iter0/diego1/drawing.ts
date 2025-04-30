

// example of how to draw a puzzle with regions!


import assert from 'node:assert';

const BOX_SIZE = 16;
const CELL_BORDER = 0.2;

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

const REGIONS = [
    [[1, 2], [1, 5], [1, 1], [1, 3], [1, 4], [1, 6], [1, 7], [1, 8], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 8], [3, 5]],
    [[2, 9], [4, 10], [1, 9], [1, 10], [2, 10], [3, 9], [3, 10], [4, 9], [5, 9], [5, 10], [6, 9], [6, 10], [7, 10], [8, 10]],
    [[3, 2], [3, 4], [3, 3]],
    [[2, 7], [4, 8], [3, 6], [3, 7], [3, 8]],
    [[6, 1], [9, 1], [3, 1], [4, 1], [4, 2], [4, 3], [4, 4], [5, 1], [5, 2], [5, 3], [6, 2], [7, 1], [7, 2], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6]],
    [[5, 4], [5, 6], [4, 5], [5, 5], [6, 4], [6, 5], [6, 6]],
    [[6, 8], [8, 7], [4, 6], [4, 7], [5, 7], [5, 8], [6, 7], [7, 6], [7, 7], [7, 8], [8, 8]],
    [[7, 3], [7, 5], [6, 3], [7, 4]],
    [[8, 9], [10, 10], [7, 9], [9, 9], [9, 10]],
    [[9, 3], [10, 6], [9, 2], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 7], [10, 8], [10, 9]]
]

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
function drawBox(canvas: HTMLCanvasElement, x: number, y: number, color: string): void {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');

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

    const OFFSET_X = 8;
    const OFFSET_Y = 8;

    for (let i = 0; i < REGIONS.length; i++) {
        const currentRegion = REGIONS[i] ?? assert.fail("undefined");
        const regionColor = COLORS[i] ?? assert.fail("undefined");

        for (const [row, col] of currentRegion) {
            assert(row !== undefined); assert(col !== undefined);
            drawBox(
                canvas,
                (col + 2*CELL_BORDER) * BOX_SIZE + OFFSET_X,
                (row + 2*CELL_BORDER) * BOX_SIZE + OFFSET_Y,
                regionColor
            )
        }
    }



    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}

main();