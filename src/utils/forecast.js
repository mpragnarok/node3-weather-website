const request = require('request')


const forecast = (lantitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a6c6d7c62e22dd6584063c327eb061cb/${lantitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.
            Wind speed is ${body.currently.windSpeed} m/s.
            Humidity is ${body.currently.humidity} %
            `)
        }
    })
}

module.exports = forecast