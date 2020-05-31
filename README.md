# Phone Number Local Time 
> Get the local time of given phone number

### How to Use

Install **phone number local time** dependency in your existing project by executing below command.

```sh
$ npm i phonenumber-now
```

then include in your required file by below command

```javascript
var phoneNumberNow = require("phonenumber-now"); 

const details = phoneNumberNow("+12126712234");

// You can provide with space
const details = phoneNumberNow("+1 2126712234");

// You can provide with space
const details = phoneNumberNow("+1-2126712234");

// You can provide with hypen
const details = phoneNumberNow("+1-2126712234");

//You can provide with brackets
const details = phoneNumberNow("+1 (212) 6712234");
```

You will get array of object like below,

```js
[
  {
    country: 'United States',
    ISO2: 'US',
    ISO3: 'USA',
    topLevelDomain: 'us',
    FIPS: 'US',
    E164: 1,
    phoneCode: 1,
    continent: 'North America',
    capital: 'Washington',
    tzInCapital: 'America/New_York',
    currency: 'Dollar',
    languageCodes: 'en-US,es-US,haw,fr',
    code: 200,
    msg: 'OK',
    moment: Moment<2020-05-31T06:43:45-04:00>,
    timeDiff: 570,
    updated: true
  }
]
```

### Things to note

- If given phone number is invalid, will return `[]`
- If given mobile number belongs to two or more countries, then all of them will be retrived in an array of objects

### Return value description

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Key | Value |
| ------ | ------ |
| code | status code 200 - success, 404 - some details missing | 
| msg | message |
| **moment** | moment object will be returned to use further | 
| **timeDiff** | contains time difference between client local time zoneand phone number time zone |
| country | Phone number belongs to the country |
| ISO2 | ISO2 format of country eg 'US' |
| ISO3 | ISO3 format of country eg 'USA'|
| E164, phoneCode | country code eg '1' |
| continent |  continent of the country |
| capital | captital of the country |
| tzInCapital | Time zone of the captial |
| currency | currency used in the country |
| languageCodes | language used in the country | 


License
----
MIT

**Free Software!**
