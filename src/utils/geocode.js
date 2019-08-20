const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?&access_token=pk.eyJ1IjoibXByYWduYXJvayIsImEiOiJjanpmMWxxdGIwN3lkM25sa3d5bnpqYjRpIn0.klPnJyx0uud6afDwD8r6-A&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocoding service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the place', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geocode