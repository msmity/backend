// setup.. similar to when we use default tags in html
const express = require("express")
// We have to use cors in order to host a front end and backend on the same device
var cors = require('cors')

//const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users")

// activate or tell this app variable to be an expresss server
const Song = require("./models/song")
const app = express()
app.use(cors())

//Middleware that parses HTTP requests with JSON body
app.use(express.json())

const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async(req,res) =>{
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try{
        await newUser.save()
        console.log(newUser)
        res.status(201)
    }
    catch(err){
        res.status(400).send(err)
    }
})
//authenticate or login
//post request - reason why is because when you login you are creating a new 'session'
router.post("/auth", async(req,res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
        return 
    }
    //try to find username in databse, then see if it matches a username and password
    let user = await User.findOne({username : req.body.username})
        //connection or server error

            if(!user){
                res.status(401).json({error: "Bad username"})
            }
            //check if user password matches requests password
            else{
                if(user.password != req.body. password){
                    res.status(401).json({error: "Bad Password"})
                }
                else{
                    username2 = user.username
                    const token = jwt.encode({username: user.username}, secret)
                    const auth = 1

                    res.json({
                        username2,
                        token: token,
                        auth: auth
                    })
                }
            }      
})

//check status of user with a valid token
router.get("/status", async(req,res) => {
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing X-Auth"})
    }

    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token,secret)

        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "Invalid"})
    }
})

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

router.delete("/songs/:id", async(req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({_id: song._id})
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//all requests that usually use an api start with /api (localhost:3000/api/songs)
app.use("/api", router)
app.listen(3000)