
import assert from "assert";

// Define Cell as row-col coordinates for a cell on the puzzle grid
export type Cell = {
    row: number;
    col: number;
    regionId: number;
    state: CellState;
}

// Define CellState as the two possible states a cell may assume
export enum CellState {
    Empty,
    Star
}

/**
 * An immutable data type used to represent a Star Battle
 * Puzzle game.
 */
export class Puzzle { 


    /**
     * Creates a new Star Battle Puzzle.
     * 
     * @param height the height of the puzzle grid; a non-negative integer
     * @param width the height of the puzzle grid; a non-negative integer
     * @param cells all the cells in the Puzzle grid. Must be such that
     * cells.length = height * width
     */
    public constructor(
        public readonly height: number,
        public readonly width: number,
        private readonly cells: Array<Cell>
    ) {
        throw new Error("Not implemented yet!");
    }


    /**
     * Checks the representation invariant.
     */
    private checkRep(): void {
        throw new Error("Not implemented yet!");
    }

    /**
     * Gets the total number of stars in the same row.
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @returns the number of stars in the row-th row
     */
    private starsInRow(row: number): number {
        throw new Error("Not implemented yet!");
    }

    /**
     * Gets the total number of stars in the same column.
     * 
     * @param col the row index of the row to check.
     * Must be a non-negative integer less than this.width
     * @returns the number of stars in the col-th column
     */
    private starsInColumn(col: number): number {
        throw new Error("Not implemented yet!");
    }

    /**
     * Gets the total number of stars in the same region.
     * 
     * @param seedRow the row index of the checked cell.
     * Must be a non-negative integer less than this.height
     * @param seedCol the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returns the number of stars in the region containing
     * cell at position (seedRow, seedCol)
     */
    private starsInRegion(seedRow: number, seedCol: number): number {
        throw new Error("Not implemented yet!");
    }

    /**
     * Creates a new copy of this board, wih an extra star.
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returns a new Puzzle identical to the original, but with
     * a new star added to cell at position (row, col)
     * @throws Error if this will result invalid board / there was already
     * a star there, and if preconditions on row and col are violated
     */
    public addStar(row: number, col: number): Puzzle {
        throw new Error("Not implemented yet!");
    }

    /**
     * Creates a new copy of this board, wih a now removed star.
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returns a new Puzzle identical to the original, but with
     * the star removed from cell at position (row, col)
     * @throws if preconditions on row and col are violated
     */
    public removeStar(row: number, col: number): Puzzle {
        throw new Error("Not implemented yet!");
    }

    /**
     * Checks if a gven cell is empty
     * 
     * @param row the row index of the row to check.
     * Must be a non-negative integer less than this.height
     * @param col the column index of the row to check.
     * Must be a non-negative integer less than this.width
     * 
     * @returs the true if the state of cell (row, col) is empty,
     * false otherwise
     */
    public isCellEmpty(row: number, col: number): boolean {
        throw new Error("Not implemented yet!");
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
        return this.height * row + col;
    }
    
    /**
     * Gets the row-col coordinates into the puzzle grid from
     * the flattened 2D array index
     * 
     * @param index the index into this.grid of the cell in question
     * @returns the cell coordinaes
     */
    private indexToCoords(index: number): Cell {
        return {
            row: Math.floor(this.height / index),
            col: this.width % index
        }
    }

}