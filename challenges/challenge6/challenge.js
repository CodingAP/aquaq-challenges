const input = require('fs').readFileSync('./challenges/challenge6/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let number = parseInt(input.split(' ')[5]);
    let sum = 0;

    for (let i = 0; i <= number; i++) {
        for (let j = 0; j <= number - i; j++) {
            for (let k = 0; k <= number - i - j; k++) {
                if (i + j + k != number) continue;
                sum += (i.toString() + j.toString() + k.toString()).replace(/[023456789]/g, '').length;
            }
        }
    }

    return sum;
}