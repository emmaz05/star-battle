
import assert from "assert";

// Define Cell as row-col coordinates for a cell on the puzzle grid
export type Cell = {
    row: number;
    col: number;
}

// Define CellState as the two possible states a cell may assume
export enum CellState {
    Empty,
    Star
}


/**
 * An immutable data type used to represent the regions of a
 * Star Battle Puzzle
 */
class Region {
    // Abstraction function:
    //  - AF(cells) = the region that contains all cells in cells
    //                and no others.
    // Representation invariant:
    //  - this.cells[i] !== this.cells[j] for all 0 <= i, j < this.cells.length
    //  (in the loose sense pf !== meaning the two positions are unique)
    // Safety from representation expousre:
    //  - All methods return immutable types or copies of mutable type
    //  - The one field in the rep is never reassigned or modified


    /**
     * Creates a new Region.
     * 
     * @param cells all the positions that correspond to this region,
     * where cells are given by their row-col positions with respect to
     * the a Puzzle grid. Must also have no repeatingc cells.
     */
    public constructor(
        private readonly cells: Array<Cell>
    ) {
        this.checkRep();
    }

    /**
     * Check the representation invariant.
     */
    private checkRep(): void {
        throw new Error("Not implemented yet!");
    }

    /**
     * Check if the region contains the specified cell coordinates.
     * 
     * @param row the row index
     * @param col the column index
     * @returns true if this region contins a cell with position (row, col),
     * false otherwise
     */
    public containsCell(row: number, col: number): boolean {
        for (const cell of this.cells) {
            if (cell.row === row && cell.col === col) {
                return true;
            }
        }
        return false;
    }

    /**
     * Gets all the cells in this region
     * 
     * @returns 
     */
    public allCells(): Array<Cell> {
        return [...this.cells];
    }
}



/**
 * An immutable data type used to represent a Star Battle
 * Puzzle game.
 */
export class Puzzle { 

    private readonly grid: Array<CellState> = [];


    /**
     * Creates a new Star Battle Puzzle.
     * 
     * @param height the height of the puzzle grid; must be a non=negative integer
     * @param width the width of the puzzle grid; must be a non=negative integer
     * @param regions an array of all the regions in this puzzle, such that
     * each cell within all region is part of exactly one region.
     * @param starCells the row-col coordinates of all cells containing a star.
     */
    public constructor(
        public readonly height: number,
        public readonly width: number,
        private readonly regions: Array<Region>,
        private readonly starCells: Array<Cell>
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
    public isCellEmpty(row: number, col: number): CellState {
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