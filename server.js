const { request } = require('express');
const express = require('express')
const app = express();
const genPfp = require('./access.js')

app.listen(3000)

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) =>{
    
    console.log(req +  " has been made")
    genPfp().then(person => {
        res.render('main', {
            name : person.name,
            age: person.age,
            location: person.location,
            favoriteColor: person.favoriteColor,
            favoriteGenre: person.favoriteGenre,
            pfp: person.pfp
        
        })
    })
})

app.use((req, res) => {
  res.render('error')
})