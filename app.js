const express = require('express');
app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const axios = require('axios')
const methodOverride = require('method-override')
const OWM_KEY = "0e6aaaf70d0751c80e78751f4c53c371"
const URL_OWM = `http://api.openweathermap.org/data/2.5/weather?appid=${OWM_KEY}&units=metric`

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/map', (req, res) => {
    res.render('choroplethmap')
})

app.post('/', async(req, res) => {
    const {city} = req.body;
    axios.get(`${URL_OWM}&q=${city}`)
    .then(ress => {
        const data = ress.data
        console.log(data.name)
        res.render('show', {data})
    }).catch(e => {
        console.log(e)
    })

})


app.listen('3000', () => {
    console.log('LISTENING ON PORT 3000')
})