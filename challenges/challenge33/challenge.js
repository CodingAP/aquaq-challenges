const common = require('../../scripts/common');

module.exports = input => {
    let numbers = new Array(parseInt(input) + 1).fill(-1);

    numbers[0] = 0;
    for (let i = 1; i <= 20; i++) {
        numbers[i] = 1;
        numbers[i * 2] = 1;
        numbers[i * 3] = 1;
    }
    numbers[25] = 1;
    numbers[50] = 1;
    
    for (let i = 1; i <= input; i++) {
        if (numbers[i] != -1) continue;
        let min = numbers[i - 1] + 1;
        for (let j = 1; j <= i / 2; j++) {
            let darts = numbers[j] + numbers[i - j];
            if (darts < min) min = darts;
        }
        numbers[i] = min;
    }

    let result = 0;
    for (let i of numbers) result += i;
    return result;
}