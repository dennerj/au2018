var conditionValue = false;

switch (customTransID) {
    case 'SIGN_OFF_ENG':
        conditionValue = (!item.ENG_REVIEW_DATE && userID === item.ENG_REVIEW_NAME.USER_ID);
        break;
    case 'SIGN_OFF_PRODUCTION':
        conditionValue = (!item.MFG_REVIEW_DATE && userID === item.MFG_REVIEW_NAME.USER_ID);
        break;
    case 'SIGN_OFF_PLANT_MANAGER':
        conditionValue = (!item.PLANT_REVIEW_DATE && userID === item.PLANT_REVIEW_NAME.USER_ID);
        break;
    case 'TO_FOLLOW_UP':
        conditionValue = (
            (!!item.MFG_REVIEW_DATE || item.MFG_REVIEW_NAME.FULL_NAME === 'N/A') &&
            (!!item.PLANT_REVIEW_DATE || item.PLANT_REVIEW_NAME.FULL_NAME === 'N/A') &&
            (!!item.ENG_REVIEW_DATE || item.ENG_REVIEW_NAME.FULL_NAME === 'N/A')
        );
        break;
    case 'CLOSE_FROM_ACTIVE':
        conditionValue = (item.CLOSE_FROM_ACTIVE === 'Yes');
        break;
    default:
        break;
}

returnValue(conditionValue);