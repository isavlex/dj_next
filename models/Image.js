const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  // review_id: {type: Number, unique: true},
  _id: Number,

  image: {type: String, unique: false, }
})

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema)