/* Copyright (c) 2025 MIT 6.102 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

/** Functions for working with Bézier curves. @module */

import assert from 'node:assert';
import { lerp } from './lerp.js';
import * as utils from './utils.js';

/*
 * PS1 instructions:
 * - You must strengthen, but may NOT weaken, the specifications in this file.
 */

/**
 * A point on the Cartesian plane.
 */
export type Point = { x: number, y: number };

/**
 * TODO: you determine the detailed spec, which must be stronger than what is provided
 * @param controlPoints contains control points
 * @param t unconstrained interpolation parameter
 * @returns Point consisting of the Bezier interpolation of the control points on parameter t according mathematical defnition
 * @throws Error if and only if controlPoints is empty
 */
export function bezierInterpolate(controlPoints: Array<Point>, t: number): Point {
    // base case: 1 control point
    // recursive case: n control points
    //  - compute n-1 new control points by taking each adjacent pair of control points and
    //    linearly interpolating between them
    //  - interpolate along the new (n-1)-point curve
    if (controlPoints.length === 0) throw new Error("Invalid input array");
    if (controlPoints.length === 1) return controlPoints[0] ?? {x: 0, y: 0};
    const nextPoints: Array<Point> = [];
    for (let i = 0; i < controlPoints.length -1; i++){
        const first = controlPoints[i];
        const second = controlPoints[i+1];
        assert (first !== undefined && second !== undefined, 'error');
        const nextX = lerp(first.x, second.x, t);
        const nextY = lerp(first.y, second.y, t);
        nextPoints.push({x:nextX, y:nextY});
    }

    return bezierInterpolate(nextPoints, t);

}

/**
 * Given a Bézier curve and an easing function, produce a sequence of points suitable for animating
 * the eased movement along the curve. See https://en.wikipedia.org/wiki/Bézier_curve for an explanation
 * of Bézier curves. The easing function must satisfy:
 * - easing(t) is always in [0, 1], so that the interpolation stays on the curve
 * 
 * @param controlPoints Bézier curve control points P_0 through P_n, nonempty
 * @param easing function mapping input interpolation parameter ti, 0 <= ti <= 1, to an applied
 *   interpolation parameter, as constrained above
 * @param numCurvePoints is the number > 2 of points on the bezier path to return
 * @returns the array of numCurvePoints evenly-spaced across ti (the input parameter to easing) points 
 * on the bezier path for controlPoints. 
 */
export function bezierPath(controlPoints: Array<Point>, easing: (ti: number) => number, numCurvePoints: number): Array<Point> {
    if (numCurvePoints === undefined  || numCurvePoints <= 2) {
        const result: Array<Point> = [];
        for (let i = 0; i < numCurvePoints; i++){
            if (i < controlPoints.length){
                result.push(controlPoints[i]?? {x:0,y:0});
            }
        }
        const single = controlPoints[0] ?? {x:0,y:0};
        const double = controlPoints[1] ?? {x:0,y:0};
        return (controlPoints.length > 1) ? [single, double] : [single];
    }
    const ti = 1 / (numCurvePoints - 1);
    const result: Array<Point> = [];
    for (let i = 0; i < numCurvePoints; i++){
        const singlePoint = bezierInterpolate(controlPoints, easing(ti*i));
        result.push(singlePoint);
    }
    return result;
}
