const express = require('express')
const cors = require('cors')
const notesRouter = require('./controllers/notes.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use('/api/notes', notesRouter)
 
app.get('/', (_, res) => res.send(`<h1>Working!</h1>`))

module.exports = app