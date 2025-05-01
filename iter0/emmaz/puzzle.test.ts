import assert from 'assert';

/**
 * Tests for the Puzzle abstract data type
 */

describe('Puzzle: constructor()', function () {
    //
    // Partitions:
    //  - on size: <= 0, >= 1
    //  - on cells: repeated locations, no repeated locations
    //  - on cells.length: = 0, between 0 and size^2 exclusive, = size^2, > size^2

    it('Covers: invalid size (size <= 0)', function() { 
        
    });

    it('Covers: no cells given', function() { 
        
    });

    it('Covers: cells.length !== size^2', function() { 
        
    });

    it('Covers: cells has repeated cells', function() { 
        
    });

    it('Covers: valid size and cells provided', function() { 
        
    });

})

describe('Puzzle: cellIsEmpty()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - output: expected true, expected false
    
    
    it('Covers: invalid row index', function() { 
        
    });

    it('Covers: invalid column index', function() { 
        
    });

    it('Covers: valid coords, cell IS empty', function() { 
        
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        
    });

})

describe('Puzzle: addStar()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star


    it('Covers: invalid row index', function() { 
        
    });

    it('Covers: invalid column index', function() { 
        
    });

    it('Covers: valid coords, cell IS empty', function() { 
        
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        
    });
})

describe('Puzzle: removeStar()', function () {
    //
    // Partitions:
    //  - row: valid, out of puzzle bounds
    //  - col: valid, out of puzzle bounds
    //  - cell at (row, col): is empty, has a star

    it('Covers: invalid row index', function() { 
        
    });

    it('Covers: invalid column index', function() { 
        
    });

    it('Covers: valid coords, cell IS empty', function() { 
        
    });

    it('Covers: valid coords, cell IS NOT empty', function() { 
        
    });
})


