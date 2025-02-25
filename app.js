// setup.. similar to when we use default tags in html
const express = require("express")
// We have to use cors in order to host a front end and backend on the same device
var cors = require('cors')
// activate or tell this app variable to be an expresss server
const Song = require("./models/song")
const app = express()
app.use(cors())

//Middleware that parses HTTP requests with JSON body
app.use(express.json())

const router = express.Router()
//start the web server app.listen(portnumber, function)


//Get list of all songs in the database
router.get("/songs", async(req,res) =>{
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

//Grab a single song in database
router.get("/songs/:id", async (req, res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch{
        res.status(400).send(err)
    }
})

//added a song to the database
router.post("/songs", async(req,res) =>{
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//update is to update an existing record/resource/database entry
router.put("/songs/:/id", async(req,res) => {
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//all requests that usually use an api start with /api (localhost:3000/api/songs)
app.use("/api", router)
app.listen(3000)