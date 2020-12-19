const input = require('fs').readFileSync('./challenges/challenge22/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let conversions = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M'
    };

    let sum = 0;
    let keys = Object.keys(conversions);
    let numbers = input.split(' ');

    for (let i = 0; i < numbers.length; i++) {
        let value = parseInt(numbers[i]);
        let numeral = '';

        for (let j = keys.length - 1; j >= 0; j--) {
            while (value >= keys[j]) {
                value -= keys[j];
                numeral += conversions[keys[j]];
            }
        }

        for (let j = 0; j < numeral.length; j++) {
            sum += numeral.charCodeAt(j) - 64;
        }
    }

    return sum;
}