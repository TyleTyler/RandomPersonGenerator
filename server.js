const express = require('express')
const app = express();

app.listen(3000)

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) =>{
    console.log(req +  " has been made")
    res.render('main')
})