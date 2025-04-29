export enum State {Empty, Dot, Star};

/**
 * Immutable puzzle ADT to represent valid unsolved, partially-solved, and fully-solved puzzles
 */
export class Puzzle {

    private readonly size: number;
    private readonly regions: Array<Array<number>>;
    private readonly states: Array<Array<State>>;
    private readonly squaresInRegion: Map<number, [row: number, col: number]>;

    // Abstraction function
    //      AF(regions, states, squaresInRegion) = the puzzle state where for each 0 <= r < size, 0 <= c < size, regions[r][c] contains the index of the region that the square 
    //      at r, c is contained within and states[r][c] contains the state at that square.
    // Rep invariant
    //      - regions is a size x size 2D array
    //      - the keys in squaresInRegion are the numbers 1 - size, inclusive
    //      - for region r in 1 <= r <= size, r = regions[row][col] for all row, col in squaresInRegion.get(r)
    // Safety from rep exposure
    //      all fields are private readonly
    //      arrays and maps are not mutated anywhere after creation
    //      TODO: add more prob
    
    /**
     * Creates an instance of the puzzle ADT
     * @param input tbd how puzzles are created, prob something with parser/grammar stuff
     */
    public constructor(input: any) {

    }

    /**
     * Checks the rep invariants of the class
     */
    private checkRep(): void {

    }

    /**
     * @returns true if this puzzle state is a solved state
     */
    public isSolved(): boolean {

    }

    /**
     * Returns the region that the square at row, col is in
     * @param row row of square
     * @param col column of square
     * @throws error if and only if row or col are out of bounds of the puzzle
     */
    public getRegion(row: number, col: number): number {

    }

    /**
     * Returns the state of the square at row, col
     * @param row row of square
     * @param col column of square
     * @throws error if and only if row or col are out of bounds of the puzzle
     */
    public getState(row: number, col: number): State {

    }
    
    // add more methods as needed
}