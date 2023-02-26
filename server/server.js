// add dependencies
const express = require("express")
const app = express()
const cors = require("cors")

//config port
const port = 8000

// express config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//import mongoose
require('./config/mongoose.config')

//import routes
const Routes = require('./routes/notes.routes.js')
Routes(app)
// --- end of dependencies --- //

// these should be at the bottom
// ap listen at this port then console log out
app.listen(port, () => console.log(`Nodemon running port: ${port}`))