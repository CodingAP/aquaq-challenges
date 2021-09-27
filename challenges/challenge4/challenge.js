const common = require('../../scripts/common');

module.exports = input => {
    let number = parseInt(input);
    let sum = 0;

    for (let i = 1; i < number; i++) {
        if (common.gcd(i, number) == 1) sum += i;
    }

    return sum;
}