
//#region Functions
/**
 * If the transition name begins with a certain pattern then extract the
 * pattern to simplify the repeating case statements.
 * Else return an unmodfieied transition name.
 * @todo Possibly refactor. This function is a bit verbose but works well.
 * @todo Refactor hardcoded tranistion names in regex. Possibly use a lookup object.
 * @param {string} transID
 * @example
 * parseCustomTransID('SEND_TO_WIP'):  // SEND_TO_WIP
 * parseCustomTransID('CANCEL_5'):     // CANCEL
 * parseCustomTransID('COMMENT_33'):   // COMMENT
 * parseCustomTransID('DO_CANCEL_5'):  // DO_CANCEL_5
 * parseCustomTransID('COMMENT_THIS'): // COMMENT_THIS
 */
// eslint-disable-next-line no-unused-vars
function parseCustomTransID(transID) {
    parsedID = transID;
    if (/^((COMMENT_)|(CANCEL_))(\w*)$/.test(parsedID)) {
    // if (/^((COMMENT_)|(CANCEL_)|(DEVRESET_))(\w*)$/.test(parsedID)) {
        // On match split string, slice result to first element, return string (simple trans name).
        parsedID = parsedID.split('_').slice(0, 1).toString();
    } else {
        parsedID = transID
    }
    return parsedID;
}
//#endregion


var testCustomTransID = [
    'BEGIN',
    'SEND_FOR_APPROVAL',
    'APPROVE_REPAIR',
    'REJECT_REPAIR',
    'REJECT',
    'COMPLETE',
    'CANCEL_BEFORE',
    'CANCEL_FROM_APPROVAL',
    'COMMENT_0',
    'COMMENT_5',
    'DEVRESET_0',
    'DEVRESET_1',
    'DEVRESET_2',
]


for (var i = 0; i < testCustomTransID.length; i++) {
    customTransID = testCustomTransID[i];

    var workflowTransitionName = parseCustomTransID(customTransID);
    switch (workflowTransitionName) {

        case 'BEGIN':
            break;
        case 'SEND_FOR_APPROVAL':
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

}