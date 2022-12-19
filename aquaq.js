import process from 'process';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { fileURLToPath, URLSearchParams } from 'url';

const settings = JSON.parse((await fs.readFile('./settings.json')).toString());

const fetchChallenge = async challenge => {
    await generateChallenge(challenge);

    const response = await fetch(`https://challenges.aquaq.co.uk/challenge/${challenge}/input.txt`, {
        headers: {
            cookie: `session=${settings.token}`,
            'User-Agent': 'https://www.github.com/CodingAP/aquaq-challenges aquaq (Discord AP#1519)',
        }
    });

    const input = await response.text();
    await fs.writeFile(`./challenges/challenge${(challenge + '').padStart(2, '0')}/input.txt`, input);
}

const generateChallenge = async challenge => {
    const mainCode = await fs.readFile('./scripts/main_program.js');

    const directory = `./challenges/challenge${(challenge + '').padStart(2, '0')}`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/solution.js`, mainCode);
}

const generateREADME = async (challenge, inputmode = 'STRING_TRIMMED') => {
    let results = await runChallenge(challenge, inputmode);
    let readme = await fs.readFile('./scripts/challenge_readme.md');
    readme = readme.toString()
        .replace(/%challenge%/g, challenge)
        .replace(/%challenge_padded%/g, (challenge + '').padStart(2, '0'))
        .replace(/%answer%/g, results.answer);

    const directory = `./challenges/challenge${(challenge + '').padStart(2, '0')}`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/README.md`, readme);
}

const generateWriteUp = async challenge => {
    let writeup = await fs.readFile('./scripts/writeup.md');
    writeup = writeup.toString().replace(/%challenge%/g, challenge);
    const directory = `./writeups/`;
    let exists = false;
    try {
        const stats = await fs.stat(directory);
        exists = stats.isDirectory();
    } catch (error) { }

    if (!exists) await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(directory + `/challenge${(challenge + '').padStart(2, '0')}_writeup.md`, writeup);
}

const runChallenge = async (challenge, inputmode = 'STRING_TRIMMED') => {
    const directory = `./challenges/challenge${(challenge + '').padStart(2, '0')}`;
    const { solution } = await import(directory + '/solution.js');
    let input = await fs.readFile(directory + '/input.txt');

    switch (inputmode) {
        case 'STRING_TRIMMED':
            input = input.toString().trim();
            break;
        case 'STRING':
            input = input.toString();
            break;
        case 'BYTES':
            break;
    }
    let results = {};

    let start = process.hrtime();
    results.answer = await solution(input);
    results.time = process.hrtime(start)[1] / 1000000;

    return results;
}

const printHelpMessage = () => {
    console.log(
        `AquaQ Challenge Manager

Usage:
    node aquaq [--f | --g | --m | --w] --c=<challenge>
    node aquaq --r --c=<challenge> --i=<inputmode> 
    node aquaq [--h | --help]
            
Options:
    --c, --challenge    Number of the challenge (defaults to 0 if nothing is provided)
    --f, --fetcher      Gets the challenge's input and creates new solution folder for the day
    --g, --generate     Generates the solution folder without getting the input
    --h, --help         Shows the help message
    --i, --inputmode    Set's the inputs mode (string/bytes, trimmed/not trimmed, etc.). Defaults to trimmed string.
    --m, --readme       Generates a README for the day with information like results and writeup
    --r, --run          Run day's solution for testing
    --w, --writeup      Generates a write up file
`
    );
}

if ((process.argv[1] + '.js') === fileURLToPath(import.meta.url)) {
    const options = {
        mode: 'HELP',
        challenge: 0,
        inputmode: 'STRING_TRIMMED',
        error: false
    }

    process.argv.slice(2).forEach(arg => {
        let tokens = arg.split('=');
        switch (tokens[0]) {
            case '--f':
            case '--fetcher':
                options.mode = 'FETCH';
                break;
            case '--g':
            case '--generate':
                options.mode = 'GENERATE';
                break;
            case '--h':
            case '--help':
                options.mode = 'HELP';
                break;
            case '--m':
            case '--readme':
                options.mode = 'README';
                break;
            case '--r':
            case '--run':
                options.mode = 'RUN';
                break;
            case '--w':
            case '--writeup':
                options.mode = 'WRITEUP';
                break;
            case '--c':
            case '--challenge':
                if (isNaN(tokens[1]) || parseInt(tokens[1]) < 0 || parseInt(tokens[1]) > 38) {
                    console.log(`\x1b[31mERROR: challenge is not a valid value (expected 0-38; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.challenge = tokens[1];
                break;
            case '--i':
            case '--inputmode':
                if (tokens[1] != 'string_trimmed' && tokens[1] != 'string' && tokens[1] != 'bytes') {
                    console.log(`\x1b[31mERROR: inputmode is not a valid value (expected string_trimmed, string, or bytes; got ${tokens[1]})\x1b[0m`);
                    options.error = true;
                } else options.inputmode = tokens[1].toUpperCase();
                break;
        }
    });

    if (!options.error) {
        switch (options.mode) {
            case 'FETCH':
                await fetchChallenge(options.challenge);
                console.log(`\x1b[33mCreated solution.js and fetched the input for challenge ${options.challenge}!\x1b[0m`);
                break;
            case 'GENERATE':
                await generateChallenge(options.challenge);
                console.log(`\x1b[33mCreated solution.js for challenge ${options.challenge}!\x1b[0m`);
                break;
            case 'HELP':
                printHelpMessage();
                break;
            case 'README':
                await generateREADME(options.challenge, options.inputmode);
                console.log(`\x1b[33mCreated README.js for challenge ${options.challenge}!\x1b[0m`);
                break;
            case 'RUN':
                const results = await runChallenge(options.challenge, options.inputmode);
                console.log(`\x1b[32m~~~~~~~~~~~~~~~~\x1b[31m AquaQ Challenge: Challenge ${options.challenge} \x1b[32m~~~~~~~~~~~~~~~~\x1b[0m`);
                console.log(`\x1b[33mAnswer: \x1b[30m\x1b[47m${results.answer}\x1b[0m\t\t(${results.time} ms)`);
                break;
            case 'WRITEUP':
                await generateWriteUp(options.challenge);
                console.log(`\x1b[33mCreated a write up for challenge ${options.challenge}!\x1b[0m`);
                break;
        }
    }
}

export { fetchChallenge, generateChallenge, generateREADME, runChallenge, generateWriteUp };