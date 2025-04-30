
import { Puzzle } from "somwhere";


export class Client {
    // Abstraction Function:
    //      AF(currentPuzzle, id) = the Client with ID id that is working on puzzle currentPuzzle
    // Representation Invariant:
    //      true
    // Safety from Representation Exposure:
    //      TO-DO


    private currentPuzzle: Puzzle = new Puzzle();

    /**
     * Creates a new client for the game.
     */
    public constructor(
        private id: string
    ) {
        this.checkRep();
    }

    /**
     * Checks the representation invariant of the client
     */
    private checkRep() {
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
     * Creates a new Puzzle object that is identical to the given puzzle,
     * but with an additional star at a specified position.
     * 
     * @param puzzle the puzzle to add a star to
     * @param position the position where to add the star; should be within
     * puzzle's bounds
     * @returns a new puzzle with an extra star placed
     * @throws Error if the position is out of bounds, or a star is not allowed
     * to be added there
     */
    public addStar(puzzle: Puzzle, position: Position): Puzzle {
        throw new Error("you want to implement me sooooooo bad ;)");
    }

    /**
     * Creates a new Puzzle object that is identical to the given puzzle,
     * but with a star removed from a specified position.
     * 
     * @param puzzle the puzzle to remove a star from
     * @param position the position from where to remove; should be a valid
     * position in the puzzle's bounds, and also a star's position
     * @returns a new puzzle with a star removed
     * @throws Error if the position is out of bounds, or if there was no star
     * to remove at that position.
     */
    public removeStar(puzzle: Puzzle, position: Position): Puzzle {
        throw new Error("you want to implement me sooooooo bad ;)");
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
     * Announces to the user that they have solved the puzzle.
     */
    public declareSolved(): void {
        throw new Error("you want to implement me sooooooo bad ;)");
    }

}

