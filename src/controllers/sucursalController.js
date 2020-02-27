'use strict'

const Empresa = require('../models/Empresa')
const Sucursal = require('../models/Sucursal')

function crearSucursal(req, res) {
var sucursal = new Sucursal()
var empresaId = req.params.id
var params = req.body

if(params.nombre){
    sucursal.nombre = params.nombre
    sucursal.empresa = req.empresa.sub
    sucursal.save((err, sucursalGuardada) => {
        if(err) return res.status(500).send({ message: 'Error en la peticion' })
            if(!sucursal) return res.status(404).send({ message: 'Error al agregar la sucursal' })
            return res.status(200).send({message: 'Sucursal Guardada', sucursal: sucursalGuardada})
    })
}

    
}

function editarSucursal(req, res) {
    
}

function eliminarSucursal(req, res) {
    
}

module.exports = {
    crearSucursal,
    editarSucursal,
    eliminarSucursal
}