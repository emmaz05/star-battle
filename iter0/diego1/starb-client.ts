
import { Puzzle } from "somwhere";

// request a blank puzzle, display the puzzle on screen, allow the user to add stars anywhere on the grid, display those stars, allow the user to remove stars they have added, and inform the user if and when they have solved the puzzle.

// On startup, any instructions needed by the user should be shown on the web page.

// The client must support clicking on the puzzle to add stars.

// [for now] The client may use only canvas drawing, and may not use any other HTML elements for drawing or interaction.
// [for now] The client must request and play the single puzzle given by the PUZZLE constant at the top of starb-client.ts.
// [for now] Clicking on an added star must remove it.
// The client may either determine that the puzzle is solved on its own, or it may request a determination from the server.
// No other interactions or capabilities are required (for example, marking empty cells is not required, even if it makes solving more fun).
// The particular graphical presentation is entirely up to you (for example, you could indicate regions with background colors instead of outlines, or draw smiley faces instead of stars).
// Keep in mind that puzzle files have (row, col) coordinates, not (x, y) coordinates.




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

