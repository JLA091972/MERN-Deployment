const mongoose = require ('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Need to fill out Title !!!"],
        minlength: [2, "Title must contain at least 2 characters"]
    },
    body: {
        type: String,
        required: [true, "Note body is required"],
        minlength: [3, "Body need at least 3 character"],
        maxlength: [255, "Body must contain max of 255 characters"]
    }
},{timestamps:true})

//need this last line
module.exports = mongoose.model('Note',NoteSchema)