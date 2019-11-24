let msgTable = [
    { char: 'E', count: 3 },
    { char: 'A', count: 7 },
    { char: 'D', count: 9 },
    { char: 'B', count: 10 },
    { char: 'C', count: 11 },
    { char: 'F', count: 12 },
    { char: 'H', count: 13 },
    { char: 'G', count: 14 },

]

createCodeTree(msgTable);


function createCodeTree(messageTable) {
    let codeTree = [];
    let tmp = 0;
    let i = 0;
    while (messageTable.length > 1) {
        tmp = messageTable[i].count + messageTable[i + 1].count;
        codeTree.push({
            value: tmp,
            left: messageTable[i].count,
            right: messageTable[i + 1].count,
            lc: messageTable[i].char,
            rc: messageTable[i + 1].char
        });
        messageTable.splice(i, 2);
        messageTable.push({ count: tmp });

    }
    console.log(codeTree);
}