const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicdir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Namuduri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aditya Namuduri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aditya Namuduri'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
       return res.send({
            error: 'Please enter address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
             return res.send({error})
        } else {
            const latitude = data.latidude
            const longitude = data.longitude
                
            forecast({latitude, longitude}, (error, foreCastData) => {
              console.log('Herererererererer')
              if(error){
                    return res.send({error})
              }
              return res.send({
                forecast: foreCastData,  
                data,
                'Address': req.query.address})
            })   
        }
    })

    
})



app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
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
    name: 'Aditya', errorMessage:'Help Page Not Found'})
})

app.get('*', (req,res) => {
    res.render('404', {
        name: 'Aditya', errorMessage:'Page Not Found'})
})

app.listen(3000, () => {
    console.log('Server is up on port : 3000')
})