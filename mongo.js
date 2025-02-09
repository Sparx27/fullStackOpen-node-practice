const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(connectionString)
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.log('ERROR: Mongoose connection failed'))

const noteSchema = new mongoose.Schema({
  content: String,
  done: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString(),
    delete retObj.__v,
    delete retObj._id
  }
})

module.exports = mongoose.model('Note', noteSchema)