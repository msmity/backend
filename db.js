const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://masmitty20:Feanor1988@cluster0.7ryva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {useNewUrlParser: true}
)

module.exports = mongoose