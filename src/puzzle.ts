
import assert from "assert";

// Define Cell as row-col coordinates for a cell on the puzzle grid

/**
 * An immutable data type used to represent a cell in the Star Battle grid.
 * 
 * Abstraction Function:
 *  AF(row, col, regionId, state) = the cell at position (row, col) in the grid,
 *      belonging to region regionId with current state state (emoty or starred)
 * Representation Invariant:
 *    - true
 * Safety from Representation Exposure:
 *    - all fields are unrreassiganble
 */
export type Cell = {
    readonly row: number;
    readonly col: number;
    readonly regionId: number;
    readonly currentState: CellState;
    readonly expectedState: CellState;
}

// Define CellState as the two possible states a cell may assume
export enum CellState { Empty, Star }

/**
 * An immutable data type used to represent a Star Battle
 * Puzzle game.
 */
export class Puzzle { 
    // Abstraction Function:
    //  AF(grid, regions) = the Star Battle puzzle thta has a grid of 
    //      puzzle cells stored in grid in row-major order, and regions 
    //      detailed by a a region id to list of cells mapping regions 
    // Representation Invariant:
    //      - this.height and this.width are positive integers
    //      - this.grid.length = this.height * this.width
    //      - the cells in this.grid are in row-major order
    // Safety from Representation Exposure:
    // all fields are private, and all methods return immutable data types

    private grid: Array<Cell> = [];
    private readonly regions: Map<number, Array<Cell>> = new Map();

    /**
     * Creates a new Star Battle Puzzle.
     * 
     * @param height the height of the puzzle grid; a positive integer
     * @param width the height of the puzzle grid; a positive integer
     * @param cells all the cells in the Puzzle grid. Must be such that
     * cells.length = height * width
     */
    public constructor(
        public readonly height: number,
        public readonly width: number,
        cells: Array<Cell>
    ) {
        this.grid = new Array(height * width);
        this.fillGrid(cells);
        this.fillRegions(cells);
        this.checkRep();
    }

    // ================================================
    // =============== PRIVATE METHODS ================
    // ================================================

    /**
     * Checks the representation invariant.
     */
    private checkRep(): void {
        
        // Check dimensions are both positive integers
        assert(this.height > 0 && Number.isInteger(this.height), "Height isnt a positve integer");
        assert(this.width > 0 && Number.isInteger(this.width), "Width isnt a positve integer");

        // Check that the grid has the correct number of cells
        assert(this.grid.length === this.height * this.width, "The amount of cells in grid does not match dimensions.");

        // Check that the cells of the grid list follow row-major order 
        for (let cellIndex = 0; cellIndex < this.grid.length; cellIndex++) {
            const ithCell: Cell = this.grid[cellIndex] ?? assert.fail(`Could not get cell at index ${cellIndex}`);
            const [expectedRow, expectedCol] = this.indexToCoords(cellIndex);
            // console.log(`Cell (${ithCell.row}, ${ithCell.col}) at index ${cellIndex} should be (${expectedRow}, ${expectedCol})`);
            assert(ithCell.row === expectedRow, `Row-major order not followd by row index of cell (${ithCell.row}, ${ithCell.col})`);
            assert(ithCell.col === expectedCol, `Row-major order not followd by column index of cell (${ithCell.row}, ${ithCell.col})`);
        }
    }

    /**
     * Fills this puzzle's grid with the cells provided, following
     * row-major order.
     * 
     * @param cells the list of cells to fill the grid with. Must
     * have length equal to this.height * this.width
     */
    private fillGrid(cells: Array<Cell>): void {
        // Go over all cells, get their index into this.grid, and fill it
        for (const cell of cells) {
            const cellIndex = this.coordsToIndex(cell.row, cell.col);
            this.grid[cellIndex] = cell;
        }
    }

    /**
     * Fills the region mapping with all the cells corresponding
     * to each region
     * 
     * @param cells all the cells in the puzzle grid.
     */
    private fillRegions(cells: Array<Cell>): void {
        // Go over all cells provided
        for (const cell of cells) {
            const regionId = cell.regionId;

            // If this is an existing region ID, add cell to corresponding list
            if (this.regions.has(regionId)) {
                this.regions.get(regionId)?.push(cell);
            // Else, create a new entry for it
            } else {
                this.regions.set(regionId, [cell]);
            }
        }
    }

    /**
     * Gets the total number of stars in the same row.
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @returns the number of stars in the row-th row
     */
    private starsInRow(row: number): number {
        // Get the indexes of the row to tally up
        const startIndex = this.width * row;
        const endIndex = (this.width + 1) * row;

        let total = 0;
        // Go over all the cells in the row
        for (let i = startIndex; i < endIndex; i++) {
            const [row, col] = this.indexToCoords(i);

            // And add to the total if it has a star
            if (this.hasStarAt(row, col)) {
                total++;
            }
        }

        return total;
    }

    /**
     * Gets the total number of stars in the same column.
     * 
     * @param col the row index of the row to check.
     * Must be a non-negative integer less than this.width
     * @returns the number of stars in the col-th column
     */
    private starsInColumn(col: number): number {
        // Get the indexes of the column to tally up
        const startIndex = col;
        const endIndex = col + this.width * (this.height - 1);

        let total = 0;
        // Go over all the cells in the column
        for (let i = startIndex; i < endIndex; i += this.width) {
            const [row, col] = this.indexToCoords(i);

            // And add to the total if it has a star
            if (this.hasStarAt(row, col)) {
                total++;
            }
        }

        return total;
    }

    /**s
     * Gets the total number of stars in the same region.
     * 
     * @param regionId the region ID of the region to check
     * 
     * @returns the number of stars in the region containing
     * cell at position (seedRow, seedCol)
     */
    private starsInRegion(regionId: number): number {
        // Get all the cells in the region
        const cellsInRegion: Array<Cell> = this.regions.get(regionId) ?? assert.fail("Invalid region ID");

        let total = 0;
        // Go over all such cells
        for(const cell of cellsInRegion) {

            // And add to the total if it has a star
            if (cell.currentState === CellState.Star) {
                total++;
            }
        }

        return total;
    }

    /**
     * Creates a new puzzle with one cell changed to the specified
     * new state.
     * 
     * @param row the row index of the cell to change.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the cell to change.
     * Must be a non-negative integer less than this.width
     * @param newState the new state of the changed cell
     * @returns 
     */
    private changeCellState(row: number, col: number, newState: CellState): Puzzle {
        // Check if the coordinates are out of bounds
        assert(!this.coordsOutOfBounds(row, col), `Invalid cell coordinates (${row}, ${col}) out of bounds.`);

        // Get the chosen cell and create the new cell
        const chosenCell: Cell = this.getCellAt(row, col);
        const newCell: Cell =  {
            row: chosenCell.row,                    // row same as the old cell
            col: chosenCell.col,                    // col same as the old cell
            regionId: chosenCell.regionId,          // regionId same as the old cell
            currentState: newState,                 // SET STATE TO DESIRED STATE
            expectedState: chosenCell.expectedState // expected state same as the old cell
        }

        // Finally, create a new puzzle with the new cell by copying over the cell grid
        const newCells: Array<Cell> = [...this.grid];
        const chosenIndex = this.coordsToIndex(row, col);
        newCells[chosenIndex] = newCell;
        return new Puzzle(this.height, this.width, newCells);
    }

    /**
     * Gets the index into a flattened 2D array from the original
     * row-col coordinates
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returns the index into this.grid which corresponds to cell (row, col)
     */
    private coordsToIndex(row: number, col: number): number {
        // Check if the coordinates are out of bounds
        assert(!this.coordsOutOfBounds(row, col), `Invalid cell coordinates (${row}, ${col}) out of bounds.`);

        return this.height * row + col;
    }
    
    /**
     * Gets the row-col coordinates into the puzzle grid from
     * the flattened 2D array index
     * 
     * @param index the index into this.grid of the cell in question
     * @returns the cell coordinaes
     */
    private indexToCoords(index: number): [number, number] {
        return [
            Math.floor(index / this.width),
            index % this.width
        ]

    }

    /**
     * Checks if the givren coordinates are out of the puzzle bounds 
     * 
     * @param row the row index of coordinates
     * @param col the column index of the coordinates
     * @returns true if the coordinates are out of bounds, false otherwise
     */
    private coordsOutOfBounds(row: number, col: number): boolean {
        const rowOutOfBounds = row < 0 || row >= this.height;
        const colOutOfBounds = col < 0 || col >= this.width;
        return rowOutOfBounds || colOutOfBounds;
    }

    // ================================================
    // ================ PUBLIC METHODS ================
    // ================================================

    /**
     * Creates a new puzzle identical to this puzzle, with an extra star.
     * 
     * @param row the row index of the cell to star.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the cell to star.
     * Must be a non-negative integer less than this.width
     * 
     * @returns a new Puzzle identical to the original, but with
     * a new star added to cell at position (row, col)
     * @throws Error if there was already a star there, and if 
     * preconditions on row and col are violated
     */
    public addStar(row: number, col: number): Puzzle {
        if (this.hasStarAt(row, col)) {
            throw new Error(`Cannot add star to filled cell (${row}, ${col})`);
        }

        return this.changeCellState(row, col, CellState.Star);
    }

    /**
     * Creates a new puzzle identical to this puzzle, with a now removed star.
     * 
     * @param row the row index of the cell to empty.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the cell to empty.
     * Must be a non-negative integer less than this.width
     * 
     * @returns a new Puzzle identical to the original, but with
     * the star removed from cell at position (row, col)
     * @throws if preconditions on row and col are violated
     */
    public removeStar(row: number, col: number): Puzzle {
        if (this.isEmptyAt(row, col)) {
            throw new Error(`Cannot remove star from empty cell (${row}, ${col})`);
        }

        return this.changeCellState(row, col, CellState.Empty);
    }

    /**
     * Checks if a given cell is empty
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returs the true if the state of cell (row, col) is empty,
     * false otherwise
     */
    public isEmptyAt(row: number, col: number): boolean {
        // Check if the coordinates are out of bounds
        assert(!this.coordsOutOfBounds(row, col), `Invalid cell coordinates (${row}, ${col}) out of bounds.`);
    
        const cell: Cell = this.getCellAt(row, col);
        return cell.currentState === CellState.Empty;
    }

    /**
     * Checks if a given cell has a star
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returs the true if the state of cell (row, col) is filled with a star,
     * false otherwise
     */
    public hasStarAt(row: number, col: number): boolean {
        // Check if the coordinates are out of bounds
        assert(!this.coordsOutOfBounds(row, col), `Invalid cell coordinates (${row}, ${col}) out of bounds.`);

        const cell: Cell = this.getCellAt(row, col);
        return cell.currentState === CellState.Star;
    }

    /**
     * Returns the Cell at the specified coordinates 
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returs the true if the state of cell (row, col) is empty,
     * false otherwise
     */
    public getCellAt(row: number, col: number): Cell {
        // Check if the coordinates are out of bounds
        assert(!this.coordsOutOfBounds(row, col), `Invalid cell coordinates (${row}, ${col}) out of bounds.`);

        const cellIndex = this.coordsToIndex(row, col);
        return this.grid[cellIndex] ?? assert.fail(`Could not get cell (${row}, ${col}) at index ${cellIndex}.`);
    }
    
    /**
     * Returns a copy of the region Id to cells mapping.
     * 
     * @returns a map mapping region IDs to a list of all the cells
     * within that region
     */
    public getRegions(): Map<number, Array<Cell>> {
        const copyOfRegions: Map<number, Array<Cell>> = new Map();
        for (const [regionId, cells] of this.regions.entries()) {
            copyOfRegions.set(regionId, [...cells]);
        }
        return copyOfRegions;
    }


    /**
     * Checks if the puzzle has been solved, according to the rules
     * of using 2n stars with exactly 2 per column, row and region.
     * 
     * @returns true if the puzzle has been solved, false otherwise
     */
    public isSolved(): boolean {
       for (const cell of this.grid) {
            if (cell.currentState !== cell.expectedState) {
                return false;
            }
        }
        return true;
    }

}