const request = require('request');

const getConfigData = () => {
    const data = {
        url: "https://api.darksky.net/forecast/",
        key: "4eafd66f94af94f1479966809a14bedb"
    }

    return data;
};

const forecast = (coordinate, callback) => {
    const config = getConfigData();
    const darkskyRequestUrl = config.url + config.key + '/' + coordinate.latitude + ',' + coordinate.longitude;

    request({url: darkskyRequestUrl, json: true}, (error, response) => {
        if(error){
            callback("There was an error. Please try again later", undefined);
            return;
        }
    
        if (response.body.error){
            callback('Unable to find location. Error code: ' + response.body.error + ' ' + 'Error message: ' + response.body.error, undefined);
            return;
        }
        
        callback(undefined, response.body.daily.data.shift().summary)
    });
};

module.exports = {
    forecast: forecast
};