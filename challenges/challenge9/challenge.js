const input = require('fs').readFileSync('./challenges/challenge9/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    return input.split('\n').map(value => BigInt(value)).reduce((acc, value) => acc * value, 1n);
}