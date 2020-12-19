const submitChallenge = require('./submitter');
const fetchMD = require('./md_fetcher');
const updateMD = require('./update_md');

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

let completeDay = async challenge => {
    await submitChallenge(challenge);
    await fetchMD(challenge);
    await updateMD();
}

if (require.main === module) {
    if (challenge != -1) completeDay(challenge);
} else {
    module.exports = completeDay;
}