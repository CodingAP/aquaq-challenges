const solution = async input => {
    let grid = [
        [' ', ' ', '#', '#', ' ', ' '],
        [' ', '#', '#', '#', '#', ' '],
        ['#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#'],
        [' ', '#', '#', '#', '#', ' '],
        [' ', ' ', '#', '#', ' ', ' '],
    ];

    let position = { x: 2, y: 0 };
    let directions = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let newPosition = { x: position.x + directions[input[i]].x, y: position.y + directions[input[i]].y };

        if (newPosition.x >= 0 &&
            newPosition.x < grid[0].length &&
            newPosition.y >= 0 &&
            newPosition.y < grid.length &&
            grid[newPosition.y][newPosition.x] == '#') position = newPosition;
    
        sum += position.x + position.y;
    }
    return sum;
}

export { solution };