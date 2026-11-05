/**
 * challenges/challenge02/solution.ts
 *
 * ~~ One is all you need ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/19/2022
 */

/**
 * the code of the challenge
 */
const solution = async (input: string) => {
    let numbers = input.split(' ').map(num => parseInt(num));

    for (let i = 0; i < numbers.length; i++) {
        const index = numbers.indexOf(numbers[i]);
        if (index != i) {
            numbers = [...numbers.slice(0, index), ...numbers.slice(i)];
            i = index;
        }
    }

    return numbers.reduce((sum, num) => sum + num, 0);
};

export { solution };
