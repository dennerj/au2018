const users = require('./users.json');
const groups = require('./groups.json');

function loadUser(userID) {
    var loadedUser = {};
    for (var i = 0; i < users.list.user.length; i++) {
        if (users.list.user[i].id === userID) {
            loadedUser = users.list.user[i];
        }
    }
    return loadedUser;
}

function inGroup(userID, groupName) {
    var result = false;
    for (var i = 0; i < groups.list.group.length; i++) {
        if (!result && groups.list.group[i].name === groupName) {
            for (var j = 0; j < groups.list.group[i].users.user.length; j++) {
                if (!result && groups.list.group[i].users.user[j].id === userID) {
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}

var Security = {
    loadUser: loadUser,
    inGroup: inGroup,
};

module.exports = Security;