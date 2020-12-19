const input = require('fs').readFileSync('./challenges/challenge2/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let numbers = common.parseListToInt(input, ' ');
    
    for (let i = 0; i < numbers.length; i++) {
        let index = numbers.indexOf(numbers[i]);
        if (index != i) {
            numbers = [...numbers.slice(0, index), ...numbers.slice(i)];
            i = index;
        }
    }

    return common.addAll(numbers);
}