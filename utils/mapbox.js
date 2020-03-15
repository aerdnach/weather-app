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
    const url = config.url + queryString;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('There was an error. Please try again later', undefined);
            return;
        }
    
        if(body.message){
            callback('Location not found [' + body.message + ']', undefined);
            return;
        }
    
        if(body.features.length === 0){
            callback('Location not found.', undefined)
            return;
        }
        
        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
    }); 
};

module.exports = {
    geocode: geocode
};