/* eslint-disable no-restricted-syntax, no-extend-native, guard-for-in, func-names, no-else-return, lines-around-directive, strict */

/**
 * Global Functions.js
 * {@link https://oldcastletraining.autodeskplm360.net/script.form?ID=300}
 */

function getTenantSettings() {
    return loadItem(356769);
}

/**
 * Populates a specific field with the items dmsID.
 */
// eslint-disable-next-line no-unused-vars
function populateDmsId() {
    if (typeof item.DMS_ID !== 'undefined' && item.DMS_ID !== item.master.dmsID) {
        item.DMS_ID = item.master.dmsID;
    }
}

/*
 * Returns a users name in the format of lastName, firstName by
 * looking up the userID.
 * - If no userID is passed then it defaults to the current user.
 * @param {string} [lookupID] Optional argument to lookup
 * @example
 * getUserName(); // Pile, Gomer
 * getUserName('1337'); // Hawkings, Stephen
 */

function getUserName(lookupID) {
    lookupID = (typeof lookupID === 'undefined') ? userID : lookupID;
    var usr = Security.loadUser(lookupID);
    return usr.lastName + ', ' + usr.firstName;
}

/**
 * Returns the user object from the name format of Last, First
 * @param {string} userName 'last, first'
 * @returns {{}} theUser
 * @example
 * var userName = 'Denner, John';
 * var userInfo = getUserObject(userName);
 * println(userInfo.id); // vYevF
 * println(userInfo.email); // john.denner oldcastle.com
 */
// eslint-disable-next-line no-unused-vars
function getUserObject(userName) {
    var userSearchProperties = {};
    userSearchProperties.lastName = userName.split(',')[0];
    userSearchProperties.firstName = userName.split(', ')[1];
    return Security.searchUsers(userSearchProperties)[0];
}

/**
 * Populate a specific field with the ERP link back to the case.
 */
// eslint-disable-next-line no-unused-vars
function populateErpCaseLink() {
    if (item.ERP_ID && item.ERP_CASE_LINK) {
        var tenantSettings = getTenantSettings();
        var erpURL = (tenantSettings.IS_SANDBOX_TENANT) ? tenantSettings.ERP_URL_SANDBOX : tenantSettings.ERP_URL_PROD;
        var erpCaseLink = '<a href="' + erpURL + '/app/crm/support/supportcase.nl?id=' + item.ERP_ID + '">' + item.ERP_CASE_NUMBER + '</a>';
        if (item.ERP_CASE_LINK !== erpCaseLink) {
            item.ERP_CASE_LINK = erpCaseLink;
        }
    }
}


// eslint-disable-next-line no-unused-vars
function arrayToLower(arr) {
    var loweredArray = [];
    arr.forEach(function (elem) {
        loweredArray.push(elem.toLowerCase());
    });
    return loweredArray;
}

// eslint-disable-next-line no-unused-vars
function arrayRemoveDuplicates(arr) {
    var uniqueArray = arr.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });
    return uniqueArray;
}

// eslint-disable-next-line no-unused-vars
function createNewItem(baseItemName, newItemProperties) {
    var newItem = createItem(baseItemName);
    for (var propKey in newItemProperties) {
        newItem[propKey] = newItemProperties[propKey];
    }
    return newItem;
}

/**
 * Took this from a website. Used as a parameter in sorting an Array of Objects.
 * Not entirely sure how it works. It seens to run the typical compare function for a sort but allows defining
 * a & b by using object keys. *
 * {@link https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/}
 * @param {string} key The key to use as the sorting value.
 * @param {string} [order] Default 'asc' ascending or 'desc' reverse.
 * @example
 * arraySortedObjects = arrayOfObjects.sort(compareValues('KEY'));
 * arraySortedObjects = arrayOfObjects.sort(compareValues('KEY', 'desc'));
 */
// eslint-disable-next-line no-unused-vars
function compareValues(key, order) {
    order = (typeof order !== 'undefined') ? order : 'asc';
    return function compare(a, b) {
        var varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        var varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        var comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return ((order === 'desc') ? (comparison * -1) : comparison);
    };
}

/**
 * Convert an array-Like object into an actual Array.
 * @param {Object} arrayLikeObject
 * @returns {Array} An Array
 * @example // Create Array from item.grid
 * var arrGrid = objToArray(item.grid);
 */
// eslint-disable-next-line no-unused-vars
function objToArr(arrayLikeObject) {
    return Array.prototype.slice.call(arrayLikeObject);
}

/**
 * Strips substrings matching HTML tags.
 * - Returns a NEW string without HTML tags.
 * @param {string} str
 * @example
 * stripHtmlTags('<p>Paragraph<br /></p>'); // Paragraph
 */
function stripHtmlTags(str) {
    return (str) ? str.replace(/(<.*?>)/g, '') : str;
}

/**
 * Converts HTML entity codes to their equivalent values.
 * - Returns a NEW string with decoded entities.
 * @param {string} str
 * @example
 * parseHtmlEntities('&#34;Double Quotes&#34;'); // "Double Quotes"
 */
function parseHtmlEntities(str) {
    return (str) ? str.replace(/&#([0-9]{1,3});/gi, function charFromCode(match, charCode) {
        return String.fromCharCode(parseInt(charCode, 10));
    }) : str;
}

/**
 * Removes HTML formatting of standard paragraph fields in Fusion Lifecycle.
 * - Paragraph fields created/edited in Modern UI are injected with HTML tags and special character
 * encodings. This utility function will remove HTML tags and decode enity codes.
 * - Useful for cleaning text saved in JSON so you can use JSON.parse() as needed.
 * - A NEW string is returned. The orginal string is never modified.
 * @param {string} encodedString Text containing tags and/or codes to be processed.
 * @example
 * item.JSON_DATA_1 = '<p> {   <br />  </p><p> &#34;KEY1&#34;:    &#34;text&#34;      }<br />  </p>';
 * println(toPlainText(item.JSON_DATA_1)); // {"KEY1": "text"}
 */
// eslint-disable-next-line no-unused-vars
function toPlainText(encodedString) {
    var decodedString = encodedString;
    if (decodedString) {
        decodedString = stripHtmlTags(decodedString);
        decodedString = parseHtmlEntities(decodedString);
        // Remove all whitespace between these chars {}], and these {}"[]
        // Does not include whitespace between double quotes.
        // Attempted simplier reqex but had issues with whitespace being removed from values.
        decodedString = decodedString.replace(/((?![{}\]),])\s+(?=[{}"\]]))/g, '');
    }
    return decodedString;
}

/**
 * Returns the HTML encoded and JSON string as a useable Object
 * @example rtfTo(item.CONFIG_DETAILS)
 */
// eslint-disable-next-line no-unused-vars
function paragraphToObject(encodedString) {
    var jsonString = toPlainText(encodedString);
    return JSON.parse(jsonString);
}

/**
 * Very basic pause function.
 * @param {number} ms Milliseconds to pause
 */
// eslint-disable-next-line no-unused-vars
function pause(ms) {
    var endtime = Date.now() + ms;
    while (Date.now() < endtime) { /* Juast killin' time */ }
}

/**
 * Very basic random whole number generator
 * @param {number} min
 * @param {number} max
 */
// eslint-disable-next-line no-unused-vars
function randomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

/**
 * A stopwatch time constructor to track timings during script runtimes.
 */
// eslint-disable-next-line no-unused-vars
function Stopwatch(timerName, resultOutputLevel) {
    timerName = (typeof timerName === 'undefined') ? 'Total' : timerName;
    resultOutputLevel = (typeof resultOutputLevel === 'undefined') ? 'alarm' : resultOutputLevel;
    this.startTime = 0;
    this.stopTime = 0;
    this.splitTimes = [{ name: timerName, cumulativeSplit: 0, splitTime: 0 }];
    this.total = 0;
    this.elapsedTime = 0;
    this.alarm = 4000;
    /**
     * Creates a mark in time with a customizable name.
     * @param {string} splitName
     */
    this.splitTime = function splitTime(splitName) {
        splitName = splitName || 'Split ' + this.splitTimes.length;
        var splitNow = Date.now();
        var cs = parseInt(splitNow - this.startTime, 10);
        var st = splitNow - (this.splitTimes[this.splitTimes.length - 1].epoch);
        st = (st > 0) ? st : cs;
        this.splitTimes.push({
            name: splitName,
            cumulativeSplit: cs,
            splitTime: st,
            epoch: splitNow,
        });
    };
    /**
     * Starts the timer.
     */
    this.startTimer = function startTimer() {
        this.startTime = (this.startTime === 0) ? Date.now() : this.startTime;
    };
    /**
     * Ends the timer.
     */
    this.stopTimer = function stopTimer() {
        this.stopTime = Date.now();
        this.elapsedTime = parseInt(this.stopTime - this.startTime, 10);
        var startToStop = parseInt(this.stopTime - this.startTime, 10);
        var epochTime = this.startTime;
        this.splitTimes[0] = {
            name: timerName,
            cumulativeSplit: startToStop,
            splitTime: startToStop,
            epoch: epochTime,
        };
    };
    this.showResult = function showResult() {
        switch (resultOutputLevel) {
            case 'alarm':
                if (this.elapsedTime > this.alarm) {
                    this.splitTimes.forEach(function (element) { // eslint-disable-line func-names
                        println(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                        Logger.log(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                    });
                }
                break;
            case 'debug':
                this.splitTimes.forEach(function (element) { // eslint-disable-line func-names
                    println(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                    Logger.log(element.name + ': ' + element.splitTime + 'ms (' + element.cumulativeSplit + 'ms)');
                });
                break;
            default:
                break;
        }
    };
}

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
    var parsedID = transID;
    if (/^((COMMENT_)|(CANCEL_))(\d+)$/.test(parsedID)) {
        // On match split string, slice result to first element, return string (simple trans name).
        parsedID = parsedID.split('_').slice(0, 1).toString();
    } else {
        parsedID = transID;
    }
    return parsedID;
}

// ============================================================================
// Pollyfills
// ============================================================================

/**
 * Object.assign()
 * The Object.assign() method is used to copy the values of all enumerable own properties from one
 * or more source objects to a target object. It will return the target object.
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}
 */
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
        // eslint-disable-next-line no-unused-vars
        value: function assign(target, varArgs) { // .length of function is 2
            if (target === null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true,
    });
}

if (!Object.values) {
    Object.values = function values(obj) {
        var vals = [];
        for (var key in obj) {
            // if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
        // }
        return vals;
    };
}

if (!Object.entries) {
    Object.entries = function entries(obj) {
        var ownProps = Object.keys(obj);
        var i = ownProps.length;
        var resArray = new Array(i); // preallocate the Arra
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    };
}

/**
 * String.prototype.startsWith()
 * @since ECMAScript 2015 (6th Edition, ECMA-262)
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes}
 * @example
 * var str = 'To be, or not to be, that is the question.';
 * console.log(str.includes('To be'));       // true
 * console.log(str.includes('question'));    // true
 * console.log(str.includes('nonexistent')); // false
 * console.log(str.includes('To be', 1));    // false
 * console.log(str.includes('TO BE'));       // false
 */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search, pos) {
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
}

/**
 * String.prototype.includes()
 * @since ECMAScript 2015 (6th Edition, ECMA-262)
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes}
 * @example
 * var str = 'To be, or not to be, that is the question.';
 * console.log(str.includes('To be'));       // true
 * console.log(str.includes('question'));    // true
 * console.log(str.includes('nonexistent')); // false
 * console.log(str.includes('To be', 1));    // false
 * console.log(str.includes('TO BE'));       // false
 */
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}