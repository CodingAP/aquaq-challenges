const getAllPossible = (indices, callback, args = [], index = 0) => {
    if (indices.length == 0) callback(args);
    else {
        let rest = indices.slice(1);
        for (args[index] = 0; args[index] < indices[0]; ++args[index]) getAllPossible(rest, callback, args, index + 1);
    }
}

const solution = async input => {
    let tokens = input.split(' ');
    let amount = parseInt(tokens[0]);
    let number = parseInt(tokens[5]);
    let total = 0;

    getAllPossible(new Array(amount).fill(number + 1), array => {
        if (array.reduce((acc, num) => acc + num, 0) != number) return;
        total += array.reduce((acc, num) => acc + num.toString().split('').filter(digit => digit == '1').length, 0);
    });
    
    return total;
}

export { solution };