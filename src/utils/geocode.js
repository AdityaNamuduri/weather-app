const request = require('request')

const geoCode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYWRpdHlhbmFtdWR1cmkiLCJhIjoiY2s4dnY0eWFnMDd0eTNmbWN1NmoxczRkbSJ9.RXjF3X4KNwAuGuB5x58xaw'
    request({url: geoCodeUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Try another search', undefined)
        } else {
            callback(undefined, {
                latidude: body.features[0].geometry.coordinates[0],
                longitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode