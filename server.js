
require('dotenv').config()
const express = require('express');
// const { Server } = require('mongodb');
const app = express()

// const mongoose = require('mongoose')

// let password = process.env.PASS
// const uri = `mongodb+srv://YestermorrowAdmin:${password}@cluster0.u2itl.mongodb.net/yestermorrow?retryWrites=true&w=majority`


let port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// mongoose.connect(uri, {
//     useNewUrlParser: true,  
//     useUnifiedTopology: true,
//   });

// const db = mongoose.connection

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/client/public/index.html')
})


// db.on(`error`, console.error.bind(console, "connection error"));

// const latlngSchema = new mongoose.Schema({
//     l
// })

// app.post('api/lnglat', async (req, res) =>{
//     let cursor = await db.latlng.find({})
//     cursor = req.body
// })



app.get('/lat', (req, res) =>{
    res.sendFile(__dirname + "/client/public/lat.json")
})

app.get('/lng', (req, res) =>{
    res.sendFile(__dirname + "/client/public/lng.json")
})

app.get('/work', (req, res) =>{
    res.sendFile(__dirname + "/work.json")
})


app.listen(port, () =>{
    console.log("listening on port" + port)
})