/**
 * Manual testing strategy (once client is available)
 * 
 * Testing drawEmptyBoard():
 *  - Ensure every cell has a region (i.e. sum of all region sizes = n*n for board of size nxn)
 *  In all following cases, drawEmptyBoard should render the squares of the puzzle board with each region having a single background color
 *  that is distinct from all other regions
 *  - Partition on region symmetry and size (number of containted cells) relative to board of size nxn:
 *      > All regions are columns and size n
 *      > All regions are rows and size n
 *      > At least one region spans multple rows and column and all regions of size n
 *      > Varying region size (at least one region having size < n and therefore at least one regon has size > n)
 * 
 *  ... 
 */