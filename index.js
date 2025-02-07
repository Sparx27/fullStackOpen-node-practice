const express = require('express')
let { notes } = require('./db/notes.js')
const { generateId } = require('./db/utilities.js')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => res.send(`<h1>Working!</h1>`))

app.get('/api/notes', (_, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  if(!note) return res.status(404).json({ message: 'Note not found' })
  res.json(note)
})

app.post('/api/notes', (req, res) => {
  if(!req.body || !req.body.content) return res.status(400).json({ message: 'Content missing' })
  const newNote = {
    id: generateId(),
    content: req.body.content,
    done: req.body.done ?? false
  }
  notes.push(newNote)
  res.status(201).json(newNote)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})