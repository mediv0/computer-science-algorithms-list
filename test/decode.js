msg = ['100',
    '000',
    '000',
    '100',
    '100',
    '010',
    '010',
    '010',
    '010',
    '110',
    '110',
    '110',
    '01',
    '01',
    '01',
    '01',
    '01',
    '01',
    '110',
    '110']


let codedTable = [
    { char: 'E', code: '000' },
    { char: 'A', code: '100' },
    { char: 'D', code: '010' },
    { char: 'B', code: '110' },
    { char: 'C', code: '01' }
]

decode(msg);

function decode(encryptedMessage) {
    let tmp;
    let decodedMessage = [];

    for (let i = 0; i < encryptedMessage.length; i++) {
        tmp = this.codedTable.find(code_ => code_.code === encryptedMessage[i]);
        decodedMessage.push(tmp.char);
    }
    return decodedMessage;
}