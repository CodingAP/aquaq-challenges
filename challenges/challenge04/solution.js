const factors = number => {
    let array = [number];
    for (let i = 1; i <= Math.sqrt(number); i++) {
        if (number % i == 0) array.push(i, number / i);
    }
    return array;
}

const solution = async input => {
    let sum = 0;
    let inputFactors = factors(parseInt(input));
    for (let i = 1; i <= parseInt(input); i++) {
        let currentFactors = factors(i);
        if (inputFactors.filter(num => currentFactors.includes(num)).length > 0) sum += i;
    }
    return sum;
}

export { solution };