

var commentTests = [
    'Hey @denner',
    'What is going on?',
    '@denner @denner @tony',
    '@reset',
    null,
    {},
    { text: 'nope' },
    undefined,
    ['text', 2, 4, true],
    7

];

function removeArrayDupes(arr) {
    if (Array.isArray(arr)) {
        return arr.slice().filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
    }
}

function getAts(commentString) {
    commentString = (typeof commentString === 'string') ? commentString : '';
    var extractedMentions = commentString.match(/@(\w+)[^.!?,]/g);
    var lowerMentions = [];
    var reducedMentions = [];
    if (extractedMentions) {
        for (var i = 0; i < extractedMentions.length; i++) {
            lowerMentions.push(extractedMentions[i].toLowerCase().trim());
        }
        reducedMentions = removeArrayDupes(lowerMentions);
    }
    return reducedMentions;
}

for (var i = 0; i < commentTests.length; i++) {
    var commentCommands = getAts(commentTests[i]);
    console.log('Test ' + i + ': ' + getAts(commentTests[i]).toString());
    if (commentCommands.indexOf('@reset') >= 0) { console.log('Record has been reset') };
}

removeArrayDupes(7);
console.log(removeArrayDupes(Array.from('poop')));