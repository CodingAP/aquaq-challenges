module.exports = input => {
    let number = parseInt(input);
    let sum = 0;

    for (let i = 0; i <= number; i++) {
        if (i == parseInt(i.toString().split('').sort().join(''))) sum++;
    }

    return sum;
}