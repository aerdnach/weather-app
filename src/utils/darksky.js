const request = require('request');

const getConfigData = () => {
    const data = {
        url: "https://api.darksky.net/forecast/",
        key: process.env.DARKSKY_KEY
    }

    return data;
};

const forecast = (coordinate, callback) => {
    const config = getConfigData();
    const url = config.url + config.key + '/' + coordinate.latitude + ',' + coordinate.longitude;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("There was an error. Please try again later", undefined);
            return;
        }
    
        if (body.error){
            callback('Unable to find location. Error code: ' + body.error + ' ' + 'Error message: ' + body.error, undefined);
            return;
        }
        
        callback(undefined, body)
    });
};

module.exports = {
    forecast: forecast
};