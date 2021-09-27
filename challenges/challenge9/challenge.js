module.exports = input => {
    return input.split('\n').map(value => BigInt(value)).reduce((acc, value) => acc * value, 1n);
}