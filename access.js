let name = document.getElementById('nameEl')
let ourRequest = new XMLHttpRequest();
let pH = document.getElementById('placeHolder')
ourRequest.open('GET','https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true')
ourRequest.onload = function(){
    let ourData = JSON.parse(ourRequest.responseText)
    name.innerText += ourData[0].fname
}

ourRequest.send();



