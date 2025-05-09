/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This test file runs in Node.js, see the `npm test` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.
// For advice about testing your web server by using `fetch` to make requests,
//   see "How to test: web server" on the *Testing* page of the project handout.

import assert from 'node:assert';

// Testing strategy
//  -   Partition on existing puzzle file vs nonexistent file

/**
 * Sends a request to the server for the text of a blank puzzle
 * @param puzzle to be requested
 * @returns the string representing the requested empty puzzle if possible, throws error otherwise
 */
async function sendRequest(puzzle: string): Promise<string> {
    try {
      const response = await fetch(`http://localhost:8789/puzzle/${puzzle}`);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.text();      // puzzle text data
      return data;
    } catch (err) {
      console.error('Fetch failed: ' + err);
      throw new Error("Fetch failed: " + err);
    }
  }

describe('server', async function() {
    const puzzleFile1 = "kd-1-1-1";
    const expected1 = `10x10
 | 1,2  1,5  1,1 1,3 1,4 1,6 1,7 1,8 2,1 2,2 2,3 2,4 2,5 2,6 2,8 3,5
 | 2,9  4,10 1,9 1,10 2,10 3,9 3,10 4,9 5,9 5,10 6,9 6,10 7,10 8,10
 | 3,2  3,4  3,3
 | 2,7  4,8  3,6 3,7 3,8
 | 6,1  9,1  3,1 4,1 4,2 4,3 4,4 5,1 5,2 5,3 6,2 7,1 7,2 8,1 8,2 8,3 8,4 8,5 8,6
 | 5,4  5,6  4,5 5,5 6,4 6,5 6,6
 | 6,8  8,7  4,6 4,7 5,7 5,8 6,7 7,6 7,7 7,8 8,8
 | 7,3  7,5  6,3 7,4
 | 8,9 10,10 7,9 9,9 9,10
 | 9,3  10,6 9,2 9,4 9,5 9,6 9,7 9,8 10,1 10,2 10,3 10,4 10,5 10,7 10,8 10,9`;

    const puzzleFile2 = "kd-6-31-6";
    const expected2 = `10x10
 | 1,1  3,1  2,1
 | 2,3  3,5  1,2 1,3 1,4 1,5 2,2 2,4 2,5
 | 1,6  2,8  1,7 1,8 1,9 1,10 2,9 2,10
 | 6,2  5,4  3,2 3,3 3,4 4,1 4,2 4,3 4,4 4,5 5,1 5,2 5,3 5,5 6,1 6,3 6,4 6,5 7,1 7,2 7,5 8,1 8,5 9,1 10,1
 | 5,6  4,8  2,6 2,7 3,6 3,7 3,8 3,9 4,6 4,7 4,9 5,7 6,6 6,7 6,8 7,6
 | 4,10 6,10 3,10 5,8 5,9 5,10 6,9 7,9 7,10 8,10 9,10 10,10
 | 7,4  8,2  7,3 8,3 8,4 9,2 10,2
 | 9,5  10,3 8,6 8,7 9,3 9,4 9,6 10,4 10,5
 | 7,7  8,9  7,8 8,8 9,8
 | 9,7  10,9 9,9 10,6 10,7 10,8`;

    const badPuzzleFile = "kdot";

    // try first puzzle and ensure it's blank
    const fetchPuzzle1 = await sendRequest(puzzleFile1);
    assert(fetchPuzzle1 === expected1, "Incorrect fetch data");

    const fetchPuzzle2 = await sendRequest(puzzleFile2);
    assert(fetchPuzzle2 === expected2, "Incorrect fetch data");

    let breaker = true;
    try{
        await sendRequest(badPuzzleFile);
        breaker = false;
    } 
    catch (err) {
        assert(true);
    }

    assert(breaker, "Should have thrown error")

    

    
    

    
});
