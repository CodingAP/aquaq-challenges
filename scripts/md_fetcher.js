const fs = require('fs');
const fetch = require('node-fetch');
const htmlParser = require('node-html-parser');
const htmlToMarkdown = require('turndown')();
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

htmlToMarkdown.addRule('code', {
    filter: ['div'],
    replacement: (content, node, options) => {
        if (node.className.split(' ').includes('bd-container-body-mono')) {
            '\n\n    ' +
            content.replace(/\n/g, '\n    ') +
            '\n\n'
        }
        return content;
    }
})

let fetchMarkdown = async challenge => {
    // const response = await fetch(
    //     `https://challenges.aquaq.co.uk/challenge/${challenge}`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
    // );

    const html = await fs.readFileSync('./challenges/challenge0/index.html');
    const root = htmlParser.parse(html);
    let markdown = htmlToMarkdown.turndown(root.querySelector('.bd-container-body').innerHTML);
    markdown = markdown.split('\n');
    markdown = markdown.slice(0, markdown.length - 1).join('\n');

    let dir = `./challenges/challenge${challenge}`;

    fs.writeFile(dir + '/README.md', markdown, (err) => {
        if (err) throw err;
        console.log(`Saved the README of challenge ${challenge}!`);
    });

    fs.writeFile(dir + '/index.html', html, (err) => {
        if (err) throw err;
    });
}

if (require.main === module) {
    if (challenge != -1) fetchMarkdown(challenge);
} else {
    module.exports = fetchMarkdown;
}