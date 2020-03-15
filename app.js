const mapbox = require('./utils/mapbox.js');
const darksky = require('./utils/darksky.js');

const address = process.argv[2];

if (!address){
    return console.log('Provide a location.')
}

mapbox.geocode (address, (error, {latitude, longitude, location}) => {
    if (error){
        return console.log(error);
    }

    darksky.forecast({latitude: latitude, longitude: longitude}, (error, darkskyData) => {
        if (error){
            return console.log(error);
        }
        console.log('Weather is ' + darkskyData + '\n' + location + ' [' + longitude + ', ' + latitude + ']');
    });
}); 