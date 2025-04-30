import {Puzzle, Square} from './puzzle.ts';

/**
 * Represents Client interaction with board
 * AF(currentBoard) = the game state of the Client's Puzzle board
 */
export class Client{
    public currentBoard: Puzzle;

    /**
     * Initializes a client to start with a new board
     */
    public constructor(){

    }

    /**
     * 
     * @param row < currentBoard.size
     * @param column < currentBoard.size
     * @param action the type of interaction with the board (e.g. remove star, add dot, etc.)
     * @returns the new Puzzle state after player clicks on position {row}, {column} on the board to complete {action}
     */
    public interact(row: number, column: number, action: someActionType ){

    }



    /**
     * Return the state of the current Puzzle board
     */
    public viewBoard(): Puzzle{
        return this.currentBoard;
    }
}