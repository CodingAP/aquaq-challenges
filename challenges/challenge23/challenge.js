const input = require('fs').readFileSync('./challenges/challenge23/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let createKey = phrase => {
        phrase = phrase.replace(/\s/g, '');
        let filtered = '';
        for (let i = 0; i < phrase.length; i++) if (!filtered.includes(phrase.charAt(i))) filtered += phrase.charAt(i);
        
        let alphabet = 'abcdefghiklmnopqrstuvwxyz';
        for (let i = 0; i < 25; i++) if (!filtered.includes(alphabet.charAt(i))) filtered += alphabet.charAt(i);
        
        let letters = {};
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                letters[filtered.charAt(y * 5 + x)] = { row: y, column: x };
            }
        }
        return letters;
    }
    
    let decrypt = (phrase, key) => {
        let decrypted = '';
        let preparedPhrase = phrase.match(/.{1,2}/g);

        for (let i = 0; i < preparedPhrase.length; i++) {
            let position1 = key[preparedPhrase[i].charAt(0)];
            let position2 = key[preparedPhrase[i].charAt(1)];

            let decryptedPart = '';

            if (position1.row == position2.row) {
                let first = Object.entries(key).find(value => {
                    let position = position1.column - 1;
                    if (position < 0) position = 4;
                    
                    return value[1].column == position && value[1].row == position1.row;
                });

                let second = Object.entries(key).find(value => {
                    let position = position2.column - 1;
                    if (position < 0) position = 4;

                    return value[1].column == position && value[1].row == position2.row;
                });

                decryptedPart = first[0] + second[0];
            } else if (position1.column == position2.column) {
                let first = Object.entries(key).find(value => {
                    let position = position1.row - 1;
                    if (position < 0) position = 4;

                    return value[1].row == position && value[1].column == position1.column;
                });

                let second = Object.entries(key).find(value => {
                    let position = position2.row - 1;
                    if (position < 0) position = 4;

                    return value[1].row == position && value[1].column == position2.column;
                });

                decryptedPart = first[0] + second[0];
            } else {
                let first = Object.entries(key).find(value => {
                    return value[1].row == position1.row && value[1].column == position2.column;
                });

                let second = Object.entries(key).find(value => {
                    return value[1].row == position2.row && value[1].column == position1.column;
                });

                decryptedPart = first[0] + second[0];
            }
            decrypted += decryptedPart;
        }
        return decrypted;
    }
    
    return decrypt(input, createKey('power plant'));
}