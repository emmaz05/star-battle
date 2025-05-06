/* Copyright (c) 2025 MIT 6.102 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

/** Function for performing linear interpolation. @module */

import assert from 'node:assert';

/**
 * Perform linear interpolation between v0 and v1 on parameter t
 * @param v0 is the first integer between 0 and 255, inclusive
 * @param v1 is the second integer between 0 and 255, inclusive
 * @param t parameter between 0 and 1, inclusive to interpolate on
 * @returns the number represented bgy the lerp equation: v0 + t * (v1 - v0)
 */ 
function lerpWeak(v0: number, v1: number, t: number): number {
    return v0 + t * (v1 - v0);
}

/**
 * Perform linear interpolation between v0 and v1 on parameter t
 * @param v0 is real
 * @param v1 is real
 * @param t is the interpolation parameter
 * @returns the number represented bgy the lerp equation: v0 + t * (v1 - v0)
 */ 
function lerpStrong(v0: number, v1: number, t: number): number {
    return v0 + t * (v1 - v0);
}

// In three sentences, explicate the relationship between your `lerpWeak` and `lerpStrong`...
// 1. In one sentence, explain the relationship between their preconditions:
// ANSWER: lerpStrong's precondition is much weaker than lerpWeak, as it includes all valid inputs to lerpWeak and more
// 2. In one sentence, explain the relationship between their postconditions:
// ANSWER: the postconditions are comparable, as they use the same equation; however lerpStrong's precondition on t allows for outputs beyond the range [v0,v1]
// 3. In one sentence, explain the resulting relationship between their specs:
// ANSWER: Since lerpStrong has a weaker precondition and comparable postcondition to lerpWeak, lerpStrong has a stronger spec

// `lerp` is the name used by clients of this function.
export const lerp = lerpStrong; 

/** PS1 instructions: both implementations are exported for PS1 testing purposes only. */
export const forTestingOnly = { lerpWeak, lerpStrong };
