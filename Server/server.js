const mongoose = require("mongoose")
const express = require("express")
const port = process.env.PORT || 5000
const app = express()
const staticDir = "./client/public"
const User = require("./Models/userSchema.js")


app.use(express.static(staticDir))
app.use(express.urlencoded({extended: true}))

app.post('/signup', async (req, res) => {
    
    if (req.body.password === req.body.confirmPassword){
        const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    res.redirect('/')
    } else {
        // stops user from being sent to the database
        return res.sendStatus(400)
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

mongoose.connect(`mongodb+srv://YestermorrowAdmin:${process.env.PASS}@cluster0.u2itl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", err => {
    console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose is connected")
  })