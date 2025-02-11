const notesRouter = require('express').Router()
const Note = require('../mongo.js')

notesRouter.get('/', (_, res) => {
  Note.find({}).then(result => res.json(result))
})

notesRouter.get('/:id', (req, res) => {
  Note.find({ _id: req.params.id })
    .then(result => {
      console.log(result)
      if(!result || result.length < 1) return res.status(404).json({ message: 'Note not found' })
      res.json(result)
    })
    .catch(() => console.log('ERROR: Find Note by id request failed'))
})

notesRouter.post('/', (req, res) => {
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

notesRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const noteExists = notes.find(n => n.id === id)
  if(!noteExists) return res.status(404).json({ message: "Note for deleteion not found" })
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

notesRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const noteExists = notes.find(n => n.id === id)
  if(!noteExists) return res.status(404).json({ message: "Note not found" })

  const { done } = req.body  
  noteExists.done = done
  res.end()
})

module.exports = notesRouter