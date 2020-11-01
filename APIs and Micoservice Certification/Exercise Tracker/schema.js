// All the requirements
const mongoose = require('mongoose')
let Schema = mongoose.Schema

// Create schema
let userSchema = new Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: Date
    }
  ]
})

// Create model
let user = mongoose.model('user', userSchema)

//Export model
exports.user = user