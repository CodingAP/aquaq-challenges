const input = require('fs').readFileSync('./challenges/challenge3/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let area = [[' ', ' ', '#', '#', ' ', ' '],
                [' ', '#', '#', '#', '#', ' '],
                ['#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#'],
                [' ', '#', '#', '#', '#', ' '],
                [' ', ' ', '#', '#', ' ', ' ']];

    let position = { x: 2, y: 0 };
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        let newPosition = { x: position.x, y: position.y };
        switch (input.charAt(i)) {
            case 'U':
                newPosition.y--;
                break;
            case 'L':
                newPosition.x--;
                break;
            case 'D':
                newPosition.y++;
                break;
            case 'R':
                newPosition.x++;
                break;
        }
        if (!(newPosition.x < 0 || newPosition.x > 5 || newPosition.y < 0 || newPosition.y > 5) && area[newPosition.y][newPosition.x] == '#') {
            position.x = newPosition.x;
            position.y = newPosition.y;
        }
        sum += position.x + position.y;
    }
    return sum;
}