const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: { type: String, require: true },
  name_en: { type: String, require: true }
})
module.exports = mongoose.model('Category', categorySchema)