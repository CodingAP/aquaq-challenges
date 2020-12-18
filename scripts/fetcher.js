const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

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

let fetchChallenge = async challenge => {
    const template = fs.readFileSync('./scripts/template').toString().replace(/\$challenge\$/, challenge);

    const response = await fetch(
        `https://challenges.aquaq.co.uk/challenge/${challenge}/input.txt`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
    );

    let body = await response.text();

    let dir = `./challenges/challenge${challenge}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFile(dir + '/input.txt', body, (err) => {
        if (err) throw err;
        console.log(`Saved input for challenge ${challenge}!`);
    });

    fs.writeFile(dir + '/challenge.js', template, (err) => {
        if (err) throw err;
        console.log(`Saved script for challenge ${challenge}!`);
    });
}

if (require.main === module) {
    if (challenge != -1) fetchChallenge(challenge);
} else {
    module.exports = fetchChallenge;
}