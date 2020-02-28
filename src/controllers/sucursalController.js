'use strict'

const Sucursal = require('../models/Sucursal')

function crearSucursal(req, res) {
    var sucursal = new Sucursal()
    var params = req.body
    var empresaId = req.params.empresaId

    if (params.nombre) {
        sucursal.nombre = params.nombre
    }
    sucursal.empresa = empresaId
    sucursal.save((err, sucursalGuardada) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!sucursal) return res.status(404).send({ message: 'Error al agregar la sucursal' })
        return res.status(200).send({ message: 'Sucursal Guardada', sucursal: sucursalGuardada })
    })
}

function editarSucursal(req, res) {
    let empresaId = req.params.empresaId
    const sucursalId = req.params.id
    const params = req.body

    if (sucursalId != empresaId) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el usuario' })
    }
    Sucursal.findByIdAndUpdate(sucursalId, params, { new: true }, (err, sucursalActualizada) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!sucursalActualizada) return res.status(404).send({ message: 'No se ha podido editar la sucursal' })
        return res.status(200).send({ sucursal: sucursalActualizada })

    })
}

function eliminarSucursal(req, res) {
    const sucursalId = req.params.id

    if (sucursalId != req.empresa.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar la sucursal' })
    }
    Sucursal.findByIdAndDelete(sucursalId, (err, empresaDeleted) => {
        Empleado.deleteMany({ empresa: sucursalId }, (err) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            return res.status(200).send({ message: 'Sucursal Eliminada', empresaEliminada: empresaDeleted })
        })
    })
}

module.exports = {
    crearSucursal,
    editarSucursal,
    eliminarSucursal
}