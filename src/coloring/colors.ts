/* Copyright (c) 2025 MIT 6.102 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

/** Functions for working with RGB colors. @module */

import assert from 'node:assert';
import { lerp } from './lerp.js';
import * as utils from './utils.js';

/*
 * PS1 instructions:
 * - All specifications in this file are required and you may NOT change them.
 * - Specifications with non-integral numbers assume a tolerance as explained in the handout,
 *   and you may NOT strengthen or weaken that tolerance.
 */

/**
 * A 3-tuple representing a color.
 */
export type Color = [number, number, number];

/**
 * Produce a multicolor gradient that transitions between the provided colors in the specified steps.
 * All colors are [r,g,b] tuples of integers 0 <= r,g,b <= 255.
 * 
 * For example, given:
 * - { 0: [0,0,252], 3: [0,126,0], 5: [254,0,0] }
 * 
 * Produces:
 * - { 0: [0,0,252], 1: [0,42,168], 2: [0,84,84], 3: [0,126,0], 4: [127,63,0], 5: [254,0,0] }
 * 
 * @param colors a map of integer keys to RGB colors, not containing keys that differ by more than 2^10
 * @returns a map whose keys are the integers from the lowest to highest keys in colors, inclusive,
 *   and each key `k` maps to the RGB color:
 *   - colors[k] if k is a key in colors
 *   - otherwise, letting `prev` and `next` be the nearest lower and higher keys in colors, respectively,
 *     the linear interpolation between colors[prev] and colors[next], rounded (half up), at t equal to
 *     k's fractional distance from prev to next
 */
// export function makeGradient(colors: Map<number, Color>): Map<number, Color> {
//     if (colors.size <= 1){
//         return new Map(colors);
//     }
//     // //sorting array by key code learned from https://www.geeksforgeeks.org/how-to-sort-a-map-in-javascript/
//     const sortedColors = [...colors.entries()].sort(([a], [b]) => a-b);
//     const sortedMap = new Map(colors); 
//     for (let i = 0; i < sortedColors.length-1; i++){
//         if (sortedColors[i] === undefined){
//             return new Map(colors);

//         }
//     }
//     const start = sortedColors[0][0];
//     const end = sortedColors[colors.size-1][0];
//     let lastIndex = start;
//     let nextIndex: number = start+1;
//     let differenceFraction;

//     for (let i = 0; i < sortedColors.length-1; i++){
//         if (colors.has(sortedColors[i][0])){
//             lastIndex = sortedColors[i][0];
//             nextIndex = sortedColors[i + 1][0];
//         }
//         for (let j = lastIndex; j < nextIndex; j++){
//             differenceFraction = (j - lastIndex)/(nextIndex-lastIndex);
//             const lastColor: Color | undefined = colors.get(lastIndex);
//             const nextColor: Color | undefined = colors.get(nextIndex);
//             if (lastColor && nextColor) sortedMap.set(j, lerpColor(lastColor, nextColor, differenceFraction));
//         }
//     }

//     return sortedMap;


// }

/**
 * Produce a palette of RGB colors that have the same saturation and lightness as the input and evenly
 * divide the spectrum of hues using the HSL representation of RGB.
 * All input and output colors are [r,g,b] tuples of integers 0 <= r,g,b <= 255.
 * See https://en.wikipedia.org/wiki/HSL_and_HSV for an explanation of HSL and its relationship to RGB.
 * 
 * For example, a palette generated from pure green (which has hue=120°, saturation=100%, lightness=50%)
 * and n=4 would have: a bright orange (hue=30°), pure green, a dodger blue (210°), and fuchsia (300°).
 * 
 * @param color base RGB color
 * @param n number of hues to select from the spectrum of hues, nonnegative integer
 * @returns an array of exactly all the distinct RGB colors converted (and rounded, half up) from HSL
 *   colors that have:
 *   - hues, in degrees, that are multiples modulo 360 of 360/n degrees from the hue of `color`,
 *   - and the same saturation and lightness as `color`
 */
export function makePalette(color: Color, n: number): Array<Color> {
    const inputHSL = utils.rgbToHsl(color);
    const maxHue = 360;
    const hueDiff = maxHue / n;
    const numComponents = 3;
    const colorList: Array<Color>=[];
    for (let i = 0; i < n; i++){
        const tempHSL: Color = [(inputHSL[0] + hueDiff*i)%maxHue, inputHSL[1], inputHSL[2]];
        colorList.push(utils.hslToRgb(tempHSL));
    }

    // remove duplicates
    const result: Array<Color> = [colorList[0] ?? [0,0,0]];
    for (const thisColor of colorList){
        let adder = false;
        for (const otherColor of result){
            for (let i = 0; i < numComponents; i++){
                adder = adder || !(thisColor[i] === otherColor[i]);
            }
        }
        if (adder){
            result.push(thisColor);
        }
        
    }
    return result;
}

/**
 * Perform interpolation of scalars with an easing function. The easing function transforms linear
 * change into change that may accelerate, oscillate, etc., and that may not be bounded or endpointed
 * by v0 and v1.
 * 
 * For example:
 * 
 *     interpolate(0, 1, t => t*t, 0.6) = 0.36
 *     interpolate(0, 10, t => t*Math.cos(2*Math.PI*t), 0.4) ≈ -3.236
 * 
 * @param v0 value when easing(t) = 0
 * @param v1 value when easing(t) = 1
 * @param easing function mapping input interpolation parameter ti, 0 <= ti <= 1, to an applied
 *   interpolation parameter, unconstrained
 * @param t input interpolation parameter
 * @returns the linear interpolation along v0 to v1 at easing(t)
 * @throws Error if t < 0 or t > 1
 */
export function interpolate(v0: number, v1: number, easing: (ti: number) => number, t: number): number {
    // In one sentence, why can you not use `lerp` with your `lerpWeak` spec to implement this function?
    //ANSWER: lerpWeak requires v0 and v1 be integers within [0,255] and t be within [0,1], but interpolate's paramaters have no such bounds (as easing(t) will be passed into lerp and is unbounded)
    if (t < 0 || t > 1) throw new Error('Invalid t value');
    return lerp(v0, v1, easing(t));
}

/**
* Converts an [R, G, B] array to a hex color string.
* @param rgb Color of red, green, blue values (0–255)
* @returns Hex color string like "#1a2b3c"
*/
export function colorToHexColor(rgb: Color): string {
 return (
   "#" +
   rgb
     .map((c) => {
       const hex = c.toString(16);
       return hex.length === 1 ? "0" + hex : hex;
     })
     .join("")
 );
}
