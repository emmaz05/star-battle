/**
 * Testing strategy for integration:
 * 
 * Test initializing game: load an empty, valid puzzle board for a client 
 * 
 * Test interaction:
 *  - Try successfully adding a star when...
 *      - 0 other stars in region
 *      - 1 other star in region
 *      - 0 other stars in row
 *      - 1 other star in row
 *      - 0 other stars in column
 *      - 1 other star in column
 *  - Try unsuccessfully adding star when...
 *      - 2 stars in region
 *      - 2 stars in row
 *      - 2 stars in column
 * 
 * continue...
 */