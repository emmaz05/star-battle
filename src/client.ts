import assert from 'assert';
import { CellState, Puzzle } from './puzzle.js';

/**
 * Mutable Client ADT to manage puzzle state and operations
 */
export class Client {
    // Abstraction Function:
    //      AF(currentPuzzle, id) = the Client with ID id that is working on puzzle currentPuzzle
    // Representation Invariant:
    //      true
    // Safety from Representation Exposure:
    //      TO-DO
    
    private currentPuzzle: Puzzle | undefined = undefined

    // private currentPuzzle: Puzzle = new Puzzle();

    /**
     * Creates a new client for the game.
     * @param id client id
     */
    public constructor(
        private readonly id: string
    ) {
        this.checkRep();
    }

    /**
     * Checks the representation invariant of the client
     */
    private checkRep(): void {
        throw new Error("you want to implement me sooooooo bad ;)");
    }

    /**
     * Request a blank puzzle to draw on.
     * 
     * @returns a new blank puzzle
     */
    public request(): Puzzle {
        throw new Error("you want to implement me sooooooo bad ;)");
    }

    /**
     * Updates the current puzzle state by adding a star at a specified position
     * 
     * @param row row of new star
     * @param col column of new star
     * @throws Error if the position is out of bounds, or if a star is already there
     */
    public addStar(row: number, col: number): void{
        assert(this.currentPuzzle !== undefined, "currentPuzzle is undefined");
        if (row >= this.currentPuzzle.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentPuzzle.width || col < 0) throw new Error('column is out of bounds');
        if (this.currentPuzzle.hasStarAt(row, col)) throw new Error('star already exists here');
        this.currentPuzzle = this.currentPuzzle.addStar(row, col);
    }

    /**
     * Updates the current puzzle state by removing a star at a specified position
     * 
     * @param row row of star to remove
     * @param col column of star to remove
     * @throws Error if the position is out of bounds, or if no star is there
     */
    public removeStar(row: number, col: number): void {
        assert(this.currentPuzzle !== undefined, "currentPuzzle is undefined");
        if (row >= this.currentPuzzle.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentPuzzle.width || col < 0) throw new Error('column is out of bounds');
        if (this.currentPuzzle.isEmptyAt(row, col)) throw new Error('star already exists here');
        this.currentPuzzle = this.currentPuzzle.removeStar(row, col);
    }

    /**
     * Displays the given puzzle on the screen.
     * 
     * @param puzzle the puzzle to display.
     */
    public displayPuzzle(puzzle: Puzzle): void {
        throw new Error("you want to implement me sooooooo bad ;)");
    }

    /**
     * @returns true if current puzzle state is solved
     */
    public declareSolved(): boolean {
        assert(this.currentPuzzle !== undefined, "currentPuzzle is undefined");
        return this.currentPuzzle.isSolved();
    }

}

