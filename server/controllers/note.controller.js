//controller needs to be able to access the model --../models/note.model
const Note = require('../models/note.model')

//Controller CRUD: Create, Read, Update, Delete

//create
module.exports.addNote = (req,res) => {
    const newNote = req.body
    Note.create(newNote)   //save to database
    .then(note => res.json(note))
    .catch(err => res.status(400).json(err))  //backend validation, send info to user with status 400
}

//Read all record 
module.exports.allNotes = (req,res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.json(err))  //backend validation
}

//Read one record from db
module.exports.oneNote = (req,res) => {
    const idFromParams = req.params.id
    Note.findOne({_id: idFromParams })
    .then((onenote) => res.json(onenote))
    .catch(err => res.json(err))  //backend validation
}

//Update one record
module.exports.updateNote = (req,res) => {
    const idFromParams = req.params.id
    const updatedValue = req.body
    //update: criteria, updated value, options
    Note.findOneAndUpdate({_id: idFromParams},updatedValue,{new:true, runValidators:true})
    .then((updatednote) => res.json(updatednote))
    .catch(err => res.status(400).json(err))  //backend validation, send info to user with status 400
}

//Delete one record
module.exports.deleteNote = (req,res) => {
    const idFromParams = req.params.id;
    Note.deleteOne({_id: idFromParams})
    .then(message => res.json(message))
    .catch(err => res.json(err))  //backend validation
}



module.exports.randomNote = (req, res) => {
    Note.aggregate([{$sample:{size:1}}] )
        .then(oneRandomNote => {
            res.json({ results: oneRandomNote })
        })
        .catch((err) => {
            res.json({ message: 'Error encountered:', error: err })
        });
}