const input = require('fs').readFileSync('./challenges/challenge0/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let numpad = [' ', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    let string = '';

    let instructions = input.split('\n');
    for (let i = 0; i < instructions.length; i++) {
        let parts = instructions[i].split(' ');
        string += numpad[parseInt(parts[0])][parseInt(parts[1]) - 1];
    }

    return string;
}