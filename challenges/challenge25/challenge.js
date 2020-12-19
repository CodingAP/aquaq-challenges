const input = require('fs').readFileSync('./challenges/challenge25/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let timeToMills = time => {
        let timeSplit = time.split(/[:.]/g);
        let mills = parseInt(timeSplit[3]);
        mills += parseInt(timeSplit[2]) * 1000;
        mills += parseInt(timeSplit[1]) * 60 * 1000;
        mills += parseInt(timeSplit[0]) * 60 * 60 * 1000;
        return mills;
    }
    
    let times = input.split('\n');
    let timeUnit = 717;
    let betweenLetters = false;
    
    let morseCode = '';
    for (let i = 0; i < times.length - 1; i++) {
        let units = (timeToMills(times[i + 1]) - timeToMills(times[i])) / timeUnit;
        if (betweenLetters) {
            morseCode += (units == 3) ? ' ' : (units == 7) ? '/' : (units == 1) ? '' : '\n';
            betweenLetters = false;
        } else {
            morseCode += (units == 1) ? '.' : '-';
            betweenLetters = true;
        }
    }
    
    let morseToText = {
        '.-': 'a',
        '-...': 'b',
        '-.-.': 'c',
        '-..': 'd',
        '.': 'e',
        '..-.': 'f',
        '--.': 'g',
        '....': 'h',
        '..': 'i',
        '.---': 'j',
        '-.-': 'k',
        '.-..': 'l',
        '--': 'm',
        '-.': 'n',
        '---': 'o',
        '.--.': 'p',
        '--.-': 'q',
        '.-.': 'r',
        '...': 's',
        '-': 't',
        '..-': 'u',
        '...-': 'v',
        '.--': 'w',
        '-..-': 'x',
        '-.--': 'y',
        '--..': 'z',
    };

    let messages = morseCode.split(/\n/);
    for (let i = 0; i < messages.length; i++) {
        let message = '';
        messages[i].split(/\//).forEach(word => {
            let actualWord = '';
            word.split(/\s/).forEach(letter => {
                actualWord += morseToText[letter];
            });
            message += actualWord + ' ';
        });
        console.log(message);
    }

    return 'paris';
}