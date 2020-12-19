const input = require('fs').readFileSync('./challenges/challenge12/input.txt').toString().trim();
const common = require('../../scripts/common');

module.exports = () => {
    let instructions = input.split('\r\n');
    let allFloors = [0];
    let floor = 0;
    let dir = 1;
    
    while (true) {
        let tokens = instructions[floor].split(' ');
        dir *= (tokens[0] == '0') ? -1 : 1;
        floor += parseInt(tokens[1]) * dir;
        allFloors.push(floor);
        
        if (instructions[floor] == null) break;
    }
    
    return allFloors.length;
}