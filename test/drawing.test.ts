/**
 * Manual testing strategy for full functionality
 * 
 * Testing drawing an empty board:
 *  -   Attempt rendering any empty (no stars) Puzzle instance and see if it draws proper grid with no stars colored by region
 *  -   Ensure every cell has a region (as determined by colors) and each region has a single, distinct color
 *  -   Ensure the correct board is drawn
 * Testing drawing a non-empty board:
 *  -   Given a Puzzle instance with at least one star, make sure that the board is rendered correctly and each star is rendered in the correct place.
 * Testing adding a star:
 *  -   Make sure that, when the user clicks on an empty cell, a star is drawn clearly within the tha cell
 *  -   Make sure no other changes are made to the board
 * Testing removing a star:
 *  -   Make sure that, when a user clicks on a cell with a star, the star is completely removed from the square and no other changes occur to the board
 * Testing winning message:
 *  -   Make sure that the output text is updated with a new win message only when the user interacts with the board and this interaction results in a winning puzzle state
 * Testing clicking outside the puzzle:
 *  -   Make sure no changes happen to a puzzle unless a user clicks somewhere within the colored puzzle board.
 */