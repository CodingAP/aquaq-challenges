const common = require('../../scripts/common');

module.exports = input => {
    let sum = 0;
    let size = 3;
    let x = null;
    input.split(/\r\n/).forEach(value => {
        let array = common.parseListToInt(value, ' ');
        let highest = -Infinity;
        if (x == null) {
            let highestX = -Infinity;
            for (let x = 0; x < array.length; x++) {
                for (let i = -1; i <= 1; i++) {
                    if (x + i < 0 || x + i >= array.length) continue;
                    let added = array.slice(x + i, x + i + size).reduce((acc, value) => acc + value, 0);
                    if (added > highest) {
                        highest = added;
                        highestX = x;
                    }
                }
            }
            x = highestX;
        } else {
            for (let i = -1; i <= 1; i++) {
                if (x + i < 0 || x + i >= array.length) continue;
                let added = array.slice(x + i, x + i + size).reduce((acc, value) => acc + value, 0);
                if (added > highest) highest = added;
            }
        }
        sum += highest;
    });
    return sum;
}