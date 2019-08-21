const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mina Huang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mina Huang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: `In anim officia consequat do mollit incididunt nulla magna ad consequat sunt dolor.`,
        title: 'Help',
        name: 'Mina Huang'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error }) // error as shorthand
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) // shorthand of error:error
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // return can stop the function execution
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Mina Huang'
    })
})


// 404 handler 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Mina Huang'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})