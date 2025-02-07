const { notes } = require('./notes.js')

function generateId() {
  const newId = Math.floor(Math.random() * 10000 + 1)
  const idExists = notes.find(n => n.id === newId)
  return idExists ? generateId() : newId
}

module.exports = { generateId }