const Database = require('./database');
const runChallenge = require('./runner');

let challenge = -1;

const commandArgs = process.argv.slice(2);
for (let i = 0; i < commandArgs.length; i++) {
    let parts = commandArgs[i].split('=');
    switch (parts[0]) {
        case '--c':
            challenge = parts[1];
            break;
        case '--challenge':
            challenge = parts[1];
            break;
    }
}

let answersDB = new Database('./scripts/answers.db');

let submitChallenge = async challenge => {
    let averageTime = 0;
    let times = 10;

    for (let i = 0; i < times; i++) {
        let answers = runChallenge(challenge);
        averageTime += answers.time;
    }

    let answers = runChallenge(challenge);
    answersDB.add(`c${challenge}`, parseInt(challenge), answers.result + '', (averageTime / times).toFixed(3));

    console.log(`Submitted challenge ${challenge}!`);
}

if (require.main === module) {
    submitChallenge(challenge);
} else {
    module.exports = submitChallenge;
}