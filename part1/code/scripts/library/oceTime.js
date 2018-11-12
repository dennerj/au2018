/**
 * Library to simplify common time and duration tasks specific to FLC.
 * Functions:   stamp()     Timestamp a field that is not populated.
 *                          Optional to force new timestamp
 * Objects:    Duration     Object containing start date, end dates and durations in milliseconds.
 *                          Example: new oceTime.Duration(start, end)
 * @method Duration.getSeconds()
 * @lends Duration.getMinutes()
 * @lends Duration..getHours()
 * @lends Duration.getDays()
 * @lends Duration.getWeekendDays()
 * {@link https://oldcastleenclosures.autodeskplm360.net/script.form?ID=249}
 */

var oceTime = {
    /**
     * Simple timestamp method to check if field is already populated and to provide
     * an argument to force an overwrite if desired.
     * @param {string} fieldID - Field ID  of
     * @param {string} [overwrite]   Default is undefined/empty arg. Set to 'overwrite' if the fieled is already
     *                               populated and you wish to set a new timestamp.
     *
     * @example
     * Sets new date in format of 'Fri Dec 08 2017 11:14:50 GMT-0500 (EST)'
     * oceTime.stamp('START_DATE');
     * @example
     * oceTime.stamp('END_DATE', 'overwrite');
     */
    stamp: function stamp(fieldID, overwrite) {
        overwrite = typeof overwrite !== 'undefined';
        var itemObj = item;
        if (!itemObj[fieldID] || overwrite) {
            itemObj[fieldID] = new Date();
        }
    },
    /**
     * @alias oceTime.Duration
     * @returns {object} Duration
     * @method Duration.getSeconds()
     * @lends Duration.getMinutes()
     * @lends Duration..getHours()
     * @lends Duration.getDays()
     * @lends Duration.getWeekendDays()        Returns number of days that are weekends from duration.
     *                                  Used to determine Business Days.
     * Duration.getBusinessDays()       Returns duration in days minus weekends
     *
     */
    Duration: function Duration(start, end) {
        this.start = new Date(start);
        this.end = new Date(end);
        this.duration = Math.abs(this.end - this.start);
        this.durationSigned = this.end - this.start;
        this.weekendMS = (function weekendMS() {
            // Copy date objects so we don't modify originals
            var s = new Date(this.start);
            var e = new Date(this.end);
            var days = 0;
            // Compare start and end including start day.
            while (s <= e) {
                // If day is a Sunday or Saturday, add to days
                if (s.getDay() === 0 || s.getDay() === 6) {
                    // println(s.toString());
                    ++days;
                }
                // To include the first day we increment start date after the first loop.
                s.setDate(s.getDate() + 1);
            }
            // This method counts whole days so we convert it back into milliseconds.
            return days * 86400000;
        }(start, end));
        this.businessMS = this.duration - this.weekendMS;
    },
};

// region Duration Protoype Methods
/**
 * @returns {number} Number of whole wekkend days during duration *
 */
oceTime.Duration.prototype.getWeekendDays = function getWeekendDays() {
    return this.weekendMS / 86400000;
};

oceTime.Duration.prototype.getBusinessDays = function getBusinessDays() {
    return this.businessMS / 86400000;
};

oceTime.Duration.prototype.getDays = function getDays() {
    return this.duration / (1000 * 60 * 60 * 24);
};

oceTime.Duration.prototype.getSignedDays = function getSignedDays() {
    return this.durationSigned / (1000 * 60 * 60 * 24);
};

oceTime.Duration.prototype.getHours = function getHours() {
    return this.duration / (1000 * 60 * 60);
};

oceTime.Duration.prototype.getMinutes = function getMinutes() {
    return this.duration / (1000 * 60);
};

oceTime.Duration.prototype.getSeconds = function getSeconds() {
    return this.duration / 1000;
};
// endregion


/**
 * Facade pattern for simplifying the tasks of stamping and calculating duartions.
 */
// eslint-disable-next-line no-unused-vars
var timeTracking = {
    holdDuration: 0,
    workingDuration: 0,
    openDuration: 0,
    setCreatedDate: function setCreatedDate() {
        oceTime.stamp('DATETIME_CREATED');
    },
    startWork: function startWork() {
        oceTime.stamp('DATETIME_WORK_START');
    },
    enterHold: function enterHold() {
        oceTime.stamp('DATETIME_HOLD_START', 'overwrite');
        item.DATETIME_HOLD_END = null;
    },
    exitHold: function exitHold() {
        oceTime.stamp('DATETIME_HOLD_END', 'overwrite');
        this.holdDuration = new oceTime.Duration(item.DATETIME_HOLD_START, item.DATETIME_HOLD_END);
        item.TOTAL_HOLD_TIME += this.holdDuration.getDays();
    },
    endComplete: function endComplete() {
        oceTime.stamp('DATETIME_WORK_END', 'overwrite');
        oceTime.stamp('DATETIME_CLOSED', 'overwrite');
        this.workingDuration = new oceTime.Duration(item.DATETIME_WORK_START, item.DATETIME_WORK_END);
        this.holdDuration = new oceTime.Duration(item.DATETIME_HOLD_START, item.DATETIME_HOLD_END);
        this.openDuration = new oceTime.Duration(item.DATETIME_CREATED, item.DATETIME_CLOSED);
        item.TOTAL_WORKING_TIME += this.workingDuration.getBusinessDays() - this.holdDuration.getDays();
        item.TOTAL_OPEN_TIME = this.openDuration.getDays();
    },
    endCancel: function endCancel() {
        if (item.DATETIME_HOLD_START && item.DATETIME_HOLD_END) {
            this.holdDuration = new oceTime.Duration(item.DATETIME_HOLD_START, item.DATETIME_HOLD_END);
        } else {
            this.holdDuration = new oceTime.Duration(0, 0);
        }
        if (item.DATETIME_WORK_START) {
            oceTime.stamp('DATETIME_WORK_END', 'overwrite');
            this.workingDuration = new oceTime.Duration(item.DATETIME_WORK_START, item.DATETIME_WORK_END);
            item.TOTAL_WORKING_TIME += this.workingDuration.getBusinessDays() - this.holdDuration.getDays();
        }
        oceTime.stamp('DATETIME_CLOSED', 'overwrite');
        this.openDuration = new oceTime.Duration(item.DATETIME_CREATED, item.DATETIME_CLOSED);
        item.TOTAL_OPEN_TIME = this.openDuration.getDays();
    },
};

// exports.oceTime = oceTime;