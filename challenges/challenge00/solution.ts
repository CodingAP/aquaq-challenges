/**
 * challenges/challenge00/solution.ts
 *
 * ~~ What's a numpad? ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/18/2022
 */

/**
 * the code of the challenge
 */
const solution = async (input: string) =>
    input.trim().split('\n').map(line => line.split(' ')).reduce((string, [key, times]) => string + [' ', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'][parseInt(key)][parseInt(times) - 1], '');

export { solution };
