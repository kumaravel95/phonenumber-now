const parsePhoneNumber = require('libphonenumber-js');
const moment = require('moment-timezone');
const dial = require("./data/dial.json");

module.exports = function phoneNumberNow(phoneNumber) {
    var tzInCapital;

    this._parsePhoneNumber = function(phoneNumber) {
        var countryCode = "";
        try {
            const pNumber = parsePhoneNumber.parsePhoneNumberFromString(phoneNumber);
            countryCode = pNumber.countryCallingCode || "";
        }
        catch (e) {
        }
        return countryCode;
    }
    
    this._getLocalTimeZone = function(tzInCapital) {
        var now = moment();
        var localOffset = now.utcOffset();
        now.tz(tzInCapital);
        return localOffset - now.utcOffset();
    }

    const countryCode = this._parsePhoneNumber(phoneNumber);
    const data = dial[countryCode.toString()] || [];
    if (data.length > 0) {
        for (var i in data) {
            var dat = data[i];
            if (dat.updated) {
                continue;
            }
            dat = {
                ...dat,
                "code": 200,
                "msg": "OK"
            };
            var tzInCapital = dat.tzInCapital || "";
            if (tzInCapital) {
                dat.moment = moment().tz(tzInCapital);
            } else {
                dat = {
                    ...dat,
                    "code": 404,
                    "msg": "TimeZone not found for given country code"
                };
            }
            if (dat.moment) {
                dat.timeDiff = this._getLocalTimeZone(tzInCapital);
            } else {
                dat = {
                    ...dat,
                    "code": 404,
                    "msg": "TimeZone is invalid"
                };
            }
            dat.updated = true;
            data[i] = dat;
        }
    }
    return data;
    
}
