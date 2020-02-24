'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EmpleadoSchema = Schema({
    nombre: String,
    edad: Number,
    puesto: String,
    departamento: String,
    numero: Number,
    direccion: String,
    empresa: {
        type: Schema.ObjectId, ref: 'empresa'
    }

})

module.exports = mongoose.model('empleado', EmpleadoSchema)