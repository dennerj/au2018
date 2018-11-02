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

var Security = {
    inGroup: function (userID, groupName) {
        return testUsers[userID].groups.indexOf(groupName) >= 0;
    },
    inRole: function (userID, roleName) {
        return testUsers[userID].roles.indexOf(roleName) >= 0;
    },
};

var testUsers = {
    goat: {
        groups: ['Admin', 'Engineer', 'Drafter'],
        roles: ['ER', 'IR', 'QC']
    },
};

var customTransID = 'SEND_FOR_APPROVAL';
var conditionValue = false;

switch (customTransID) {
    case 'BEGIN':
        break;
    case 'SEND_FOR_APPROVAL':
        conditionValue = Security.inGroup('goat', 'LAKERS');
        break;
    case 'APPROVE_REPAIR':
        break;
    case 'REJECT_REPAIR':
        break;
    case 'CONPLETE':
        break;
    case 'COMMENT':
        break;
    case 'CANCEL':
        break;
    case 'DEVRESET':
        break;
    default:

        break;
}

returnValue(conditionValue);

