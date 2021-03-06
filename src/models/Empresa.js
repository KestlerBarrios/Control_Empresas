'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EmpresaSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
    contacto: Number,
    direccion: String,
})

module.exports = mongoose.model('empresa', EmpresaSchema)