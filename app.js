const mapbox = require('./utils/mapbox.js');
const darksky = require('./utils/darksky.js');

// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5kcmVhY2hpZXBwYSIsImEiOiJjazdxaGpnYWYwM2UzM2VvdTh2aGdzNGpvIn0.oIbn_IIJj9AwfkelwTy2uw

const latitude = '41.153734';
const longitude = '16.412965';
const address = encodeURIComponent("Corato");

mapbox.geocode (address, (error, data) => {
    console.log(error);
    console.log(data);
}); 

darksky.forecast({latitude: latitude, longitude: longitude}, (error, data) => {
    console.log(error);
    console.log(data);
});

console.log("main function end");