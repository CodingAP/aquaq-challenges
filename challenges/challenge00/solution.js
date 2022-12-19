const solution = async input => input.split('\n').map(line => line.split(' ')).reduce((string, [key, times]) => string + [' ', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'][key][times - 1], '');

export { solution };