
const express = require('express')
const app = express();
const genPfp = require('./access.js')
const mongoose = require('mongoose')
const Profile = require('./modles/profile');
const  tools = require('./s3')
const { uploadPfp, getFile } = require('./s3')
const fs = require('fs')

const dbUri = 'mongodb+srv://wilsonr:test1234@cluster0.rrqn4vx.mongodb.net/SavedProfiles?retryWrites=true&w=majority'
mongoose.connect(dbUri).then(res => {
    console.log("Connected to DB")
    app.listen(3000)
}).catch(err => {
    console.log("Could not connect to Database")
})



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) =>{
    
    console.log(req +  " has been made")
    genPfp().then(person => {
        res.render('main', {
            fname : person.fname,
            lname : person.lname,
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
    Profile.find().sort({createdAt  : -1})
    .then(result =>{
        res.render('saved', { Header: "Saved-Profiles", list : result, pfp : tools})
    })
    .catch(err =>{
        console.log(err)
    })
})


app.post("/saved-profiles", (req, res) =>{
    Profile.find().then(length =>{
    if(length.length >= 9){
        console.log("Too many profiles")
        res.redirect("/saved-profiles")
        return
    }
    
    const profile = new Profile(req.body)
    uploadPfp("./public/pfpComponents/pfp.png", req.body.name + "'s Profile")
    profile.save()
    .then(pfp =>{
        res.redirect("/saved-profiles")
     }).catch(err =>{
        console.log(err)
     })
    })    
})


app.get('/saved-profiles/:id', (req ,res) =>{
    const id = req.params.id
    
    Profile.findById(id)
    .then(result =>{
        console.log(result.name)
        getFile(result.name + "'s Profile").pipe(res)
        // res.render('savedprof', { Header : `${result.name}'s Profile`, pfp : result})
    })
})


app.get('/test', (req, res) =>{
    const readStream = getFile("Kelly's Profile")
    readStream.pipe(res)
})

app.use((req, res) => {
    res.render('error')
  })
