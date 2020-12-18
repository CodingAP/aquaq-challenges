const fs = require('fs');

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

let runChallenge = challenge => {
    if (fs.existsSync(`./challenges/challenge${challenge}`)) {
        let before = process.hrtime();
        let result = require(`../challenges/challenge${challenge}/challenge.js`)();
        let time = process.hrtime(before)[1] / 1000000;
    
        return { result, time };
    }
    return null;
}

if (require.main === module) {
    if (challenge != -1) {
        let answers = runChallenge(challenge);
        console.log(`AquaQ Challenge ${challenge}`);
        console.log(`Result: ${answers.result}`);
    }
} else {
    module.exports = runChallenge;
}