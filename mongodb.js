const mongoose = require('mongoose')

if(!process.argv[2] || process.argv[2].length < 3) {
  console.log('Need password for connection')
  process.exit(1)
}

const pass = process.argv[2]
const connectionString = `mongodb+srv://gcnicolas2024:${pass}@cluster0.avqgn.mongodb.net/fsoNotes?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(connectionString)

const noteSchema = new mongoose.Schema({
  content: String,
  done: Boolean
})
const Note = new mongoose.model('Note', noteSchema)

const note = new Note({
  content: "First note for mongo",
  done: true
})
note.save().then(() => {
  console.log('Note saved')
  mongoose.connection.close()
})