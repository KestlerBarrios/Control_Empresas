'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ProductoSchema = Schema({
    nombre: String,
    cantidad: Number,
    sucursal: {type: Schema.ObjectId, ref: 'sucursal'},
    empresa: { type: Schema.ObjectId, ref: 'empresa' }
})

module.exports = mongoose.model('producto', ProductoSchema)