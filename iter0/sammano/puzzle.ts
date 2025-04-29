
export class Puzzle {
    private readonly puzzleGrid: Array<Array<Square>>;
    
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
}

export enum squareState {Blank, Dot, Star};
export enum boardState {Solved, PartiallySolved, Unsolved}

export type Square = {
    row: number;
    col: number;
    region: number;
    state: squareState;
}