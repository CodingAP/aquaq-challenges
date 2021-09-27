module.exports = input => {
    let [frequencyString, binary] = input.split(/\r\n/);
    let frequencies = {};
    for (let i = 0; i < frequencyString.length; i++) {
        if (!frequencies[frequencyString.charAt(i)]) frequencies[frequencyString.charAt(i)] = 0;
        frequencies[frequencyString.charAt(i)]++;
    }
    let sorted = Object.entries(frequencies).sort((a, b) => a[1] - b[1]);
    
    console.log(sorted)
    let huffmanTree = {};
    
}