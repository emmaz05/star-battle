import assert from 'node:assert';
import { Puzzle } from './puzzle.js';

/**
 * Mutable Client ADT to manage puzzle state and operations
 */
export class Client {
    // Abstraction Function:
    //      AF(currentState) = a client in the progress of solving a puzzle with puzzle state currentState
    // Representation Invariant:
    //      true
    // Safety from Representation Exposure:
    //      The puzzle ADT is immutable so allowing outside access to currentState is safe from rep exposure

    private currentState: Puzzle;

    /**
     * Creates a new client for the game.
     * @param blankPuzzle empty puzzle board
     */
    public constructor(blankPuzzle: Puzzle) {
        this.currentState = blankPuzzle;
        this.checkRep();
    }

    /**
     * Checks the representation invariant of the client
     */
    private checkRep(): void {
        assert(true);
    }

    /**
     * Updates the current puzzle state by adding a star at a specified position, 0-indexed
     * 
     * @param row row of new star
     * @param col column of new star
     * @throws Error if the position is out of bounds or a non-integer, or if a star is already there
     */
    public addStar(row: number, col: number): void {
        if (row >= this.currentState.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentState.width || col < 0) throw new Error('column is out of bounds');
        if (!Number.isInteger(row) || !Number.isInteger(col)) throw new Error('row and col must be integers');
        if (!this.currentState.isEmptyAt(row, col)) throw new Error('star already exists here');

        this.currentState = this.currentState.addStar(row, col);
        
    }

    /**
     * Updates the current puzzle state by removing a star at a specified position, 0-indexed
     * 
     * @param row row of star to remove
     * @param col column of star to remove
     * @throws Error if the position is out of bounds or a non-integer, or if no star is there
     */
    public removeStar(row: number, col: number): void {
        if (row >= this.currentState.height || row < 0) throw new Error('row is out of bounds');
        if (col >= this.currentState.width || col < 0) throw new Error('column is out of bounds');
        if (!Number.isInteger(row) || !Number.isInteger(col)) throw new Error('row and col must be integers');
        if (this.currentState.isEmptyAt(row, col)) throw new Error('no star to remove');

        this.currentState = this.currentState.removeStar(row, col);

    }

    /**
     * @returns true if puzzle is solved
     */
    public checkSolved(): boolean {
        return this.currentState.isSolved();
    }

    /**
     * @returns the current puzzle state
     */
    public getState(): Puzzle {
        return this.currentState;
    }

}