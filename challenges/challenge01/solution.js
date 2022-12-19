const solution = async input => {
    let string = input.split('').map(character => (character.match(/[a-f0-9]/g) ? character : '0')).join('').padEnd(Math.ceil(input.length / 3) * 3, '0');
    let result = '';
    for (let i = 0; i < string.length; i += string.length / 3) result += string.slice(i, i + 2);
    return result;
}

export { solution };