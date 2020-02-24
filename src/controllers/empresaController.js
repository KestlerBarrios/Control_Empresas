'use strict'

const Empresa = require('../models/Empresa')
const Empleado = require('../models/Empleado')

function crearEmpresa(req, res) {
    var empresa = new Empresa()
    var params = req.body

    if (params.nombre && params.contacto) {
        empresa.nombre = params.nombre
        empresa.contacto = params.contacto
        empresa.direccion = params.direccion

        empresa.save((err, empresaGuardada) => {
            if (err) return res.status(500).send({ message: 'Error al guardar la Empresa.' })
            if (empresaGuardada) {
                res.status(200).send({ empresa: empresaGuardada })
            } else {
                res.status(404).send({ message: 'No se ha podido registrar la empresa' })
            }
        })
    } else {
        res.status(200).send({ message: 'Rellene todos los datos necesarios' })
    }
}

function editarEmpresa(req, res) {
    const empresaId = req.params.id
    const params = req.body
    Empresa.findByIdAndUpdate(empresaId, params, { new: true }, (err, empresaActualizada) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!empresaActualizada) return res.status(404).send({ message: 'No se ha podido editar la Empresa' })
        return res.status(200).send({ empresa: empresaActualizada })

    })
}

function eliminarEmpresa(req, res) {
    const empresaId = req.params.id
    Empresa.findByIdAndDelete(empresaId, (err, empresaDeleted) => {
        Empleado.deleteMany({empresa: empresaId}, (err)=>{
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Empresa Eliminada', empresaEliminada: empresaDeleted })
        })
    })
}

module.exports = {
    crearEmpresa,
    editarEmpresa,
    eliminarEmpresa
}