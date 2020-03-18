const path = require('path');
const express = require('express');
const hbs = require('hbs');
const mapbox = require('../src/utils/mapbox.js')
const darksky = require('../src/utils/darksky.js')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Define static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'aerdnach'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'aerdnach'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'aerdnach',
        message: 'This is a useless help message from'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    mapbox.geocode(req.query.address, (error, {latitude, longitude, location, mapBoxData} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
    
        darksky.forecast({latitude, longitude}, (error, darkskyData) => {
            if (error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: 'Weather is ' + darkskyData.daily.data.shift().summary,
                location: location + ' [' + longitude + ', ' + latitude + ']',
                mapBoxResponse: JSON.stringify(mapBoxData, null, 2),
                darkSkyResponse: JSON.stringify(darkskyData, null, 2)
            })
        });
    }); 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'page not found'
    });
})


app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
});