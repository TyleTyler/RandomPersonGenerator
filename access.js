
const mergeImages = require('merge-images-v2')

let skin = document.getElementById('pfp')
let refresh = document.getElementById('refreshBut')
let city = document.getElementById('city')
let name = document.getElementById('nameEl')
let age = document.getElementById('ageEl')
let color = document.getElementById("color")
let genre = document.getElementById('genre')
let ourRequest = new XMLHttpRequest();
let pH = document.getElementById('placeHolder')


let request = async () =>{

    let req = await fetch('http://www.filltext.com/?rows=1&name={firstName}~{lastName}&age={numberRange|10,60}&location={addressObject}&favoriteColor={number|9}&favoriteGenre={number|10}&skinColor={numberRange|1,20}&pretty=true')
    let data = await req.json()
    return data;
}
refresh.addEventListener('click',function(){
    request().then(ourData =>{
        name.innerText = "Name: "
        age.innerText = "Age: "
        color.innerText = "Favorite Color: "
        genre.innerText = "Favorite Music Genre: "
        city.innerText = "Location: "    
        name.innerText += " " + ourData[0].name
        age.innerText += " " + ourData[0].skinColor
        color.innerHTML += "<br>" + colors.get(ourData[0].favoriteColor)
        genre.innerText += " " + music.get(ourData[0].favoriteGenre)
        city.innerText += ` ${ourData[0].location.streetAddress}, ${ourData[0].location.city}, ${ourData[0].location.state}`
    })
})



request().then(ourData =>{
    name.innerText += " " + ourData[0].name
    age.innerText += " " + ourData[0].skinColor
    color.innerHTML += "<br>" + colors.get(ourData[0].favoriteColor)
    genre.innerText += " " + music.get(ourData[0].favoriteGenre)
    city.innerText += ` ${ourData[0].location.streetAddress}, ${ourData[0].location.city}, ${ourData[0].location.state}`
    mergeImages([`./Skintones/Skintones[${ourData[0].skinColor}].png`])
    .then(b64 => skin.src = b64);
})





const music = new Map()
const colors = new Map()

colors.set(0,"White")
colors.set(1,"Red")
colors.set(2,"Blue")
colors.set(3,"Green")
colors.set(4,"Yellow")
colors.set(5,"Orange")
colors.set(6, "Purple")
colors.set(7, "Pink")
colors.set(8, "Brown")
colors.set(9, "Black")

music.set(0, "Punk")
music.set(1,"Country")
music.set(2, "Techno")
music.set(3, "Hip-Hop")
music.set(4, "Pop")
music.set(5,"Rock")
music.set(6,"Rap")
music.set(7, "Jazz")
music.set(8, "Folk")
music.set(9,"R&B")
music.set(10, "Reggae")