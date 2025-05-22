const mongoose = require('mongoose')
const Schema = mongoose.Schema

var movementSchema = new Schema({
   direction: {type: String, enum: ['Entrante', 'Saliente']},
   quantity: Number,
   date: {type: Date, default: Date.now}
})

module.exports = movementSchema
