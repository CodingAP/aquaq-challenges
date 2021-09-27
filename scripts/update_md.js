const fs = require('fs');
const common = require('./common');
const Database = require('./database');

let final = fs.readFileSync('./scripts/md_template').toString().split('\n');
const line = final[0];
final = final.slice(1).join('\n');

let updateMD = async () => {
    let answersDB = new Database('./scripts/answers.db');

    let table = '';
    for (let challenge = 0; challenge <= 35; challenge++) {
        let data = null;
        common.objectForEach(answersDB.entries, (key, value) => {
            if (value[0] == challenge) data = value;
        })

        let newLine = line.replace(/\$challenge\$/g, challenge);

        if (data) {
            newLine = newLine.replace(/\$result\$/, data[1]);
            newLine = newLine.replace(/\$mark\$/, '✔');
            newLine = newLine.replace(/\$time\$/, ` (${data[2]} ms)`);
        } else {
            newLine = newLine.replace(/\$result\$/, 'Not finished');
            newLine = newLine.replace(/\$mark\$/, '❌');
            newLine = newLine.replace(/\$time\$/, '');
        }
        newLine += '\n'
        table += newLine;
    }

    final = final.replace(`$table$`, table);

    fs.writeFile('./README.md', final, (err) => {
        if (err) throw err;
        console.log(`Updated README.md!`);
    });
}

if (require.main === module) {
    updateMD();
} else {
    module.exports = updateMD;
}