//#region
function returnValue(msgs) {
    if (typeof msgs === 'undefined') {
        console.log('returnValue argument is undefined!');
    } else if (typeof msgs === 'boolean') {
        console.log(msgs);
    } else if (!Array.isArray(msgs)) {
        console.log('returnValue argument is not an Array!');
    } else if (Array.isArray(msgs)) {
        if (msgs.length > 0) {
            msgs.forEach(element => { console.log(element); });
        } else {
            console.log('Passed all validations');
        }
    }
}

var customTransID;

// Array of test cases
var testCase = [
    {
        // Null field MAKE
        customTransID: 'BEGIN',
        MAKE: null,
        // Unsure if not having attachments makes the
        // property undefined or if it is an empty array.
        // Need to test in tenant.
    },
    {
        // Valid test case
        customTransID: 'BEGIN',
        MAKE: 'Ford',
        attachments: [{
            fileStatus: 'Checked IN'
        }],
    },
    {
        // Attachment is checked out
        customTransID: 'BEGIN',
        MAKE: 'Ford',
        attachments: [{
            fileStatus: 'Checked OUT'
        }],
    }
];

for (var i = 0; i < testCase.length; i++) {
    console.log('\r\n' + 'Test case ' + i);
    var messages = [];
    item = testCase[i];
    customTransID = testCase[i].customTransID;
    //#endregion

    switch (customTransID) {
        case 'BEGIN':
            if (!item.MAKE) { messages.push('Missing vehicle make.'); }
            if (typeof item.attachments !== 'undefined' && item.attachments[0].fileStatus !== 'Checked IN') {
                messages.push('Attachment is not checked in.');
            }
            break;
    }
    returnValue(messages);
}