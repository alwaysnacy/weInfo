const express = require('express');
app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const axios = require('axios')
const methodOverride = require('method-override')
const OWM_KEY = "0e6aaaf70d0751c80e78751f4c53c371"
const URL_OWM_current = `http://api.openweathermap.org/data/2.5/weather?appid=${OWM_KEY}&units=metric`
const URL_OWM_onecall = `https://api.openweathermap.org/data/2.5/onecall?&appid=${OWM_KEY}&units=metric`
const world = require('./public/data/worldinfo.json')
const countries = world.map(e => e.country)

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home', {countries})
})


app.get('/:lat/:lon', async(req, res) => {
    const {lat, lon} = req.params;
    let placeData = null;
    axios.get(`${URL_OWM_onecall}&lat=${lat}&lon=${lon}`)
    .then(ress => {
        placeData = ress.data
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        console.log(placeData)
        res.render('show', {placeData})
    }).catch(e => {
        console.log('SHOW ERROR')
        console.log(e.config)
    })
})

app.get('/map', (req, res) => {
    res.render('USChoroplethMap')
})


app.get('/worldmap', (req, res) => {
    res.render('worldChoroplethMap')
})



app.listen('3000', () => {
    console.log('LISTENING ON PORT 3000')
})