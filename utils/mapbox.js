const request = require('request');

const getConfigData = () => {
    const data = {
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
        token: "pk.eyJ1IjoiYW5kcmVhY2hpZXBwYSIsImEiOiJjazdxaGpnYWYwM2UzM2VvdTh2aGdzNGpvIn0.oIbn_IIJj9AwfkelwTy2uw",
        language: "it",
        limit: 1
    }

    return data;
};

const geocode = (address, callback) => {
    const config = getConfigData();
    const queryString = address + '.json?access_token=' + config.token + '&limit=' + config.limit + '&language=' + config.language; 
    const mapboxRequestUrl = config.url + queryString;

    request({url: mapboxRequestUrl, json: true}, (error, response) => {
        if(error){
            callback('There was an error. Please try again later', undefined);
            return;
        }
    
        if(response.body.message){
            callback('Location not found [' + response.body.message + ']', undefined);
            return;
        }
    
        if(response.body.features.length === 0){
            callback('Location not found.', undefined)
            return;
        }
        
        callback(undefined, {
            longitude: response.body.features[0].center[1],
            latitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        });
        return;
    }); 
};

module.exports = {
    geocode: geocode
};