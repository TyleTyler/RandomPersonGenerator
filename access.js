
const images = require('images')
const fetch = require('cross-fetch');
const Canvas = require('canvas')
const fs = require('fs')


let request = async () =>{
   
    let req = await fetch('http://www.filltext.com/?rows=1&name={firstName}~{lastName}&age={numberRange|10,60}&location={addressObject}&favoriteColor={number|9}&favoriteGenre={number|10}&skinColor={numberRange|1,20}&eyes={numberRange|1,3}&pretty=true')
    let ourData = await req.json()
    let eyes =   `./public/Eyes/Eyes[${ourData[0].eyes}].png`
    let skinColor = `./public/Skintones/Skintones[${ourData[0].skinColor}].png`
    let shirtColor = `./public/Shirts/Shirts[${ourData[0].favoriteColor}].png`
    
    let image =  (images(`${skinColor}`).resize(1000, 750)
    .draw(images(`${shirtColor}`).resize(1020, 750))
    .draw(images(`${eyes}`), 35))
    .resize(1000, 800)
    .encode("png", {operation:50})
    
    fs.writeFileSync("./public/pfpComponents/pfp.png", image)
    let person = {
        name: `${ourData[0].name}`,
        age: `${ourData[0].age}`,
        location: ` ${ourData[0].location.streetAddress}, ${ourData[0].location.city}, ${ourData[0].location.state}`,
        favoriteColor: colors.get(ourData[0].favoriteColor),
        favoriteGenre:  music.get(ourData[0].favoriteGenre),
        pfp : image
    }
    return person
  

}
module.exports = request


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
   
