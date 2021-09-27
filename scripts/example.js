const fs = require('fs');
const fetchChallenge = require('./fetcher');

for (let i = 0; i <= 35; i++) {
    if (!fs.existsSync(`./challenges/challenge${i}`)) fetchChallenge(i);
}