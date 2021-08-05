
require('dotenv').config()
const express = require('express');

const app = express()



let port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/client/public/index.html')
})

app.get('/lat', (req, res) =>{
    res.sendFile(__dirname + "/client/public/lat.json")
})

app.get('/lng', (req, res) =>{
    res.sendFile(__dirname + "/client/public/lng.json")
})


app.listen(port, () =>{
    console.log("listening on port" + port)
})