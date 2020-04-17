const request = require('request')

const forecastdata = {
    temperature: 0,
    feelslike: 0,
    weather_description: ''
}
const forecast = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=62506baf7845c96aa62c220b7d9877c4&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weather app', undefined)
        }else if (body.current == undefined) {
            console.log('HEREEEEEEEE')
            callback('Please try with another input', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_description: body.current.weather_descriptions[0]
            })
        }
    })    
}

module.exports = forecast