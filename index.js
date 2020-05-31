const parsePhoneNumber = require('libphonenumber-js');
const moment = require('moment-timezone');
const dial = require("./data/dial.json");

class PhoneTime {

    getData(phoneNumber) {
        var tzInCapital;

        const countryCode = this._parsePhoneNumber(phoneNumber);
        const data = dial[countryCode.toString()] || [];
        if (data.length > 0) {
            for (var i in data) {
                var dat = data[i];
                if(dat.updated) {
                    console.log("skipping")
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
                data[i]= dat;
            }
        }
        return data;
    }

    _parsePhoneNumber(phoneNumber) {
        var countryCode = "";
        try {
            const pNumber = parsePhoneNumber.parsePhoneNumberFromString(phoneNumber);
            countryCode = pNumber.countryCallingCode || "";
        }
        catch (e) {
        }
        return countryCode;
    }

    _getLocalTimeZone(tzInCapital) {
        var now = moment();
        var localOffset = now.utcOffset();
        now.tz(tzInCapital);
        return localOffset - now.utcOffset();
    }
}

module.exports = {
    PhoneTime
};