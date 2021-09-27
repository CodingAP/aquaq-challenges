module.exports = input => {
    let hexRegex = /[0-9a-f]/;
    let hexString = '';
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i).match(hexRegex)) hexString += input.charAt(i);
        else hexString += '0';
    }

    while (hexString.length % 3 != 0) hexString += '0';
    let finalHex = '';
    let gap = hexString.length / 3;

    for (let i = 0; i < hexString.length; i += gap) {
        finalHex += hexString.substring(i, i + 2);
    }
    return finalHex;
}