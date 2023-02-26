const NoteController = require('../controllers/note.controller')


module.exports = (app) => {
    //CRUD - Create Read Update Delete
    
    //create a note
    app.post('/api/note/new', NoteController.addNote)

    // //random
    app.get("/api/notes/random", NoteController.randomNote)

    //Read / display all
    app.get('/api/notes', NoteController.allNotes)

    //Read / display 1
    app.get('/api/note/:id', NoteController.oneNote)

    //Update 1
    app.put('/api/note/:id', NoteController.updateNote)

    //Delete
    app.delete('/api/note/:id', NoteController.deleteNote)
}