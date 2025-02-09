require('dotenv').config()
const express = require('express')
let { notes } = require('./db/notes.js')
const { generateId } = require('./db/utilities.js')
const cors = require('cors')
const Note = require('./mongo.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (_, res) => res.send(`<h1>Working!</h1>`))

app.get('/api/notes', (_, res) => {
  Note.find({}).then(result => res.json(result))
})

app.get('/api/notes/:id', (req, res) => {
  Note.find({ _id: req.params.id })
    .then(result => {
      console.log(result)
      if(!result || result.length < 1) return res.status(404).json({ message: 'Note not found' })
      res.json(result)
    })
    .catch(() => console.log('ERROR: Find Note by id request failed'))
})

app.post('/api/notes', (req, res) => {
  const { content, done } = req.body
  if(!content) return res.status(400).json({ message: 'Content missing' })

  const newNote = new Note({
    content,
    done: done ?? false
  })

  newNote.save().then(savedNote => {
    res.status(201).json(savedNote)
  })
  .catch(() => console.log('ERROR: Save Note request failed'))
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const noteExists = notes.find(n => n.id === id)
  if(!noteExists) return res.status(404).json({ message: "Note for deleteion not found" })
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

app.patch('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const noteExists = notes.find(n => n.id === id)
  if(!noteExists) return res.status(404).json({ message: "Note not found" })

  const { done } = req.body  
  noteExists.done = done
  res.end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})