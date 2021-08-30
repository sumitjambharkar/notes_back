const mongoose = require('mongoose')

const notesSchema = {
    title:String,
    content:String
}

module.exports = mongoose.model("Notes",notesSchema)