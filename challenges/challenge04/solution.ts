/**
 * challenges/challenge04/solution.ts
 *
 * ~~ This is good co-primen ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/19/2022
 */

/**
 * finds the factors of a number (the number itself included)
 */
const factors = (number: number): number[] => {
    const array = [number];
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i == 0) array.push(i, number / i);
    }
    return array;
};

/**
 * the code of the challenge
 */
const solution = async (input: string) => {
    input = input.trim();
    let sum = 0;
    const inputFactors = factors(parseInt(input));
    for (let i = 1; i <= parseInt(input); i++) {
        const currentFactors = factors(i);
        if (inputFactors.filter(num => currentFactors.includes(num)).length > 0) sum += i;
    }
    return sum;
};

export { solution };
