/**
 * challenges/challenge03/solution.ts
 *
 * ~~ Short walks ~~
 * this is my solution for this aquaq challenge
 *
 * by alex prosser
 * 12/19/2022
 */

/**
 * the code of the challenge
 */
const solution = async (input: string) => {
    input = input.trim();
    const grid = [
        [' ', ' ', '#', '#', ' ', ' '],
        [' ', '#', '#', '#', '#', ' '],
        ['#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#'],
        [' ', '#', '#', '#', '#', ' '],
        [' ', ' ', '#', '#', ' ', ' '],
    ];

    let position = { x: 2, y: 0 };
    const directions: Record<string, { x: number; y: number }> = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const newPosition = { x: position.x + directions[input[i]].x, y: position.y + directions[input[i]].y };

        if (newPosition.x >= 0 &&
            newPosition.x < grid[0].length &&
            newPosition.y >= 0 &&
            newPosition.y < grid.length &&
            grid[newPosition.y][newPosition.x] == '#') position = newPosition;

        sum += position.x + position.y;
    }
    return sum;
};

export { solution };
