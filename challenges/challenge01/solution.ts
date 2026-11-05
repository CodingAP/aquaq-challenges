/**
 * challenges/challenge01/solution.ts
 *
 * ~~ Rose by any other name ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/18/2022
 */

/**
 * the code of the challenge
 */
const solution = async (input: string) => {
    const string = input.split('').map(character => (character.match(/[a-f0-9]/g) ? character : '0')).join('').padEnd(Math.ceil(input.length / 3) * 3, '0');
    let result = '';
    for (let i = 0; i < string.length; i += string.length / 3) result += string.slice(i, i + 2);
    return result;
};

export { solution };
