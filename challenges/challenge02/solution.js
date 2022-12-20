const solution = async input => {
    let numbers = input.split(' ').map(num => parseInt(num));

    for (let i = 0; i < numbers.length; i++) {
        let index = numbers.indexOf(numbers[i]);
        if (index != i) {
            numbers = [...numbers.slice(0, index), ...numbers.slice(i)];
            i = index;
        }
    }
    
    return numbers.reduce((sum, num) => sum + num, 0);
}

export { solution };