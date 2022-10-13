
const express = require('express')
const app = express();
const genPfp = require('./access.js')

const mongoose = require('mongoose')
const Profile = require('./modles/profile');

const dbUri = 'mongodb+srv://wilsonr:test1234@cluster0.rrqn4vx.mongodb.net/SavedProfiles?retryWrites=true&w=majority'
    // console.log("Connected to DB")
app.listen(3000)
// }).catch(err => {
//     console.log("Could not connect to Database")
// })



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
            Header: "Profile Generator",
        })
    })
})

app.get('/create-profile', (req, res) =>{
    res.render('create', {
        Header: "Create  a Profile"
    })
})
app.get('/saved-profiles', (req, res) =>{
    genPfp().then(person => {
        res.render('saved', { list : Object.values(person), Header: 'Saved-Profiles'})
        // const profile = new Profile({
        //     name : person.name,
        //     age: person.age,
        //     location: person.location,
        //     favoriteColor: person.favoriteColor,
        //     favoriteGenre: person.favoriteGenre
        // })
        // // profile.save()
        // .then(result =>{
        //     Profile.find()
        //     .then(result =>{
        //         res.render('saved', { Header: "Saved-Profiles", list : result})
        //     })
        //     .catch(err =>{
        //         console.log(err)
        //     })
        // }).catch(err =>{
        //     res.send(err)
        })

})

app.use((req, res) => {
  res.render('error')
})

