/**
 * challenges/challenge06/solution.ts
 *
 * ~~ Let me count the ways ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/19/2022
 */

/**
 * calls back with every combination of numbers below the given limits
 */
const getAllPossible = (indices: number[], callback: (args: number[]) => void, args: number[] = [], index = 0) => {
    if (indices.length == 0) callback(args);
    else {
        const rest = indices.slice(1);
        for (args[index] = 0; args[index] < indices[0]; ++args[index]) getAllPossible(rest, callback, args, index + 1);
    }
};

/**
 * the code of the challenge
 */
const solution = async (input: string) => {
    const tokens = input.trim().split(' ');
    const amount = parseInt(tokens[0]);
    const number = parseInt(tokens[5]);
    let total = 0;

    getAllPossible(new Array(amount).fill(number + 1), array => {
        if (array.reduce((acc, num) => acc + num, 0) != number) return;
        total += array.reduce((acc, num) => acc + num.toString().split('').filter(digit => digit == '1').length, 0);
    });

    return total;
};

export { solution };
