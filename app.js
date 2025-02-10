// setup.. similar to when we use default tags in html
const express = require("express")
// We have to use cors in order to host a front end and backend on the same device
var cors = require('cors')
// activate or tell this app variable to be an expresss server
const app = express()
app.use(cors())
const router = express.Router()


//start the web server app.listen(portnumber, function)


//make an api using routes
//Routes are used to handle browser requests. They look like URLS
//The difference is when a browser requests a route, it is dynamically handled by using a function

router.get("/songs", function(req, res) {
    const songs = [
        {
        title: "Uptown Funk",
        artist: "Bruno Mars",
        popularity: 10,
        genre: ["funk", "boogie"]
    },

        {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 9,
        genre: ["soul", "new soul"]
    },
]

    res.json(songs)
})

//all requests that usually use an api start with /api (localhost:3000/api/songs)
app.use("/api", router)
app.listen(3000)