'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EmpresaSchema = Schema({
    nombre: String,
    contacto: Number,
    direccion: String,
})

module.exports = mongoose.model('empresa', EmpresaSchema)