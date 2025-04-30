/**
 * Immutable class representing Puzzle game board
 * 
 * AF(puzzleGrid, size) = A {size} by {size} Puzzle board where puzzleGrid[r][c] holds the Square at row r and column c
 *                          on the board.
 * 
 * Rep Invariant:
 *      puzzleGrid.length === puzzleGrid[i].length === size for all integers 0 <= i < size
 *      square.state === Star for no more than 2 squares that share the same row, column, or region
 */
export class Puzzle {
    private readonly puzzleGrid: Array<Array<Square>>;
    public size: number;
    
    /**
     * 
     * @param input input to form board from (likely to be parsed or already parsed)
     */
    public constructor(input: someType){

    }
    /**
     * 
     * @param row non-zero integer less than puzzle width
     * @param col non-zero integer less than puzzle height
     * @returns the Square at the given position on the board
     */
    public getSquare(row: number, col: number): Square{

        //implement later
    }

    /**
     * @returns the boardState of the board representing it's level of solving
     */
    public isSolved(): boardState{
        //implement later
    }

    /**
     * 
     * @param row
     * @returns number of starts in a given row
     */
    public numStarsInRow(row: number): number{

    }
    /**
     * 
     * @param column
     * @returns number of starts in a given column
     */
    public numStarsInColumn(column: number): number{
    
    }
    
    /**
     * 
     * @param region
     * @returns number of starts in a given column
     */
    public numStarsInColumn(region: number): number{
    
    }

    /**
     * 
     * @param row < this.height
     * @param column < this.width
     * @returns a new Puzzle state with a star added to the Square at position (row, column) on the Puzzle board if possible,
     *          otherwise returns a copy of the same Puzzle
     */
    public addStar(row: number, column: number): Puzzle{

    }
    

    /**
     * 
     * @param row < this.height
     * @param column < this.width
     * @returns a new Puzzle state with a star removed to the Square at position (row, column) on the Puzzle board if possible,
     *          otherwise returns a copy of the same Puzzle
     */
    public removeStar(row: number, column: number): Puzzle{

    }
    



}

export enum squareState {Blank, Dot, Star};
export enum boardState {Solved, PartiallySolved, Unsolved}

/**
 * Type representing a cell on a puzzle board.
 * AF(row, col, region, state) = the square on the board at position {row}, {col} in region number {region} filled with a {state}
 */
export type Square = {
    row: number;
    col: number;
    region: number;
    state: squareState;
}