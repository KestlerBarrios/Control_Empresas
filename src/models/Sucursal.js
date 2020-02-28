'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var SucursalSchema = Schema({
    nombre: String,
    empresa: { type: Schema.ObjectId, ref: 'empresa' }
})

module.exports = mongoose.model('sucursal', SucursalSchema)