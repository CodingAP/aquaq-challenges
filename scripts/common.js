let common = {
    parseListToInt: (array, splitter = '\n', radix = 10) => {
        return array.split(splitter).map(value => parseInt(value, radix));
    },
    create2DArray: (width, height, initialValue = null) => {
        let array = new Array(height);
        for (let y = 0; y < height; y++) {
            array[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                let value = initialValue;
                if (typeof initialValue === 'function') value = initialValue(x, y);
                if (Array.isArray(initialValue)) value = [...initialValue];
                array[y][x] = value;
            }
        }
        return array;
    },
    map2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                array[y][x] = callback(array[y][x], x, y);
            }
        }
    },
    forEach2DArray: (array, callback) => {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                callback(array[y][x], x, y);
            }
        }
    },
    permutator: (inputArr) => {
        let result = [];

        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                result.push(m)
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next))
                }
            }
        }

        permute(inputArr)

        return result;
    },
    addAll: array => {
        let sum = array[0];
        array.slice(1).forEach(value => { if (value != null) sum += value });
        return sum;
    },
    copy: obj => {
        return JSON.parse(JSON.stringify(obj));
    },
    arrayEquals: (a, b, matchOrder = false) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        let sortedA = JSON.parse(JSON.stringify(a)).sort();
        let sortedB = JSON.parse(JSON.stringify(b)).sort();

        for (var i = 0; i < a.length; ++i) {
            if ((matchOrder ? a : sortedA)[i] !== (matchOrder ? b : sortedB)[i]) return false;
        }
        return true;
    },
    objectForEach: (obj, callback) => {
        let keys = Object.keys(obj);
        keys.forEach(value => {
            callback(value, obj[value]);
        });
    },
    objectMap: (obj, callback) => {
        let keys = Object.keys(obj);
        keys.forEach(value => {
            obj[value] = callback(value, obj[value]);
        });
    }
}

module.exports = common;