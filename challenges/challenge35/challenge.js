const common = require('../../scripts/common');

module.exports = input => {
    let determineOrder = word => {
        let sorted = word.split('').sort().join();
        console.log(sorted);
    }

    let phrase = input.slice(0, input.length - 1);
    let wordList = common.readFile('./scripts/word_list.txt').split('\n');
    
    let words = 0;
    for (let i = 0; i < wordList.length; i++) {
        if (phrase.length % wordList[i].length != 0) continue;
        words++;
    }
    return words;
}