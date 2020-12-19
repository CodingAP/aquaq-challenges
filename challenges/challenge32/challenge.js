const input = require('fs').readFileSync('./challenges/challenge32/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let strings = input.split('\n');
    let sum = 0;
    let matches = ['()', '[]', '{}'];
    let regex = /[\(\)\[\]{}]/;

    strings.forEach(string => {
        let unbalanced = false;
        let opened = [];

        for (let i = 0; i < string.length; i++) {
            if (!string.charAt(i).match(regex)) continue;
            matches.forEach(value => {
                if (!value.includes(string.charAt(i))) return;
                let index = value.indexOf(string.charAt(i));
                if (index == 0) {
                    opened.push(string.charAt(i));
                } else if (index == 1) {
                    if (value.length == 0) unbalanced = true;
                    if (opened[opened.length - 1] != value.charAt(0)) unbalanced = true;
                    opened.pop();
                }
            });
        }

        if (!unbalanced && opened.length == 0) sum++;
    });

    return sum;
}