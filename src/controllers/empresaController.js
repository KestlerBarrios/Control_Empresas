'use strict'

const bcrypt = require("bcrypt-nodejs")

const Empresa = require('../models/Empresa')
const Empleado = require('../models/Empleado')
const jwt = require('../services/jwt')

function RegistrarEmpresa(req, res) {
    var empresa = new Empresa()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        empresa.nombre = params.nombre
        user.usuario = params.usuario
        user.email = params.email
        empresa.contacto = params.contacto
        empresa.direccion = params.direccion

        Empresa.find({ $or: [{ usuario: empresa.usuario }, { email: empresa.email }] }).exec((err, empresas) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuario.' })
            if (emrpesas && empresas.length >= 1) {
                return res.status(500).send({ message: 'La empresa ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash
                    empresa.save((err, empresaGuardada) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar la Empresa.' })
                        if (empresaGuardada) {
                            res.status(200).send({ empresa: empresaGuardada })
                        } else {
                            res.status(404).send({ message: 'No se ha podido registrar la empresa' })
                        }
                    })
                })
            }
        })

    } else {
        res.status(200).send({ message: 'Rellene todos los datos necesarios' })
    }
}

function login(req, res) {
    const params = req.body
    Empresa.findOne({ email: params.email }, (err, empresa) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (empresa) {
            bcrypt.compare(params.password, empresa.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({ token: jwt.createToken(empresa) })
                    } else {
                        usuario.password = undefined
                        return res.status(200).send({empresa: usuario})
                    }
                }else {
                    res.status(404).send({message: 'La Empresa no se pudo identificar'})
                }
            })
        }else {
            return res.status(404).send({ message: 'La Empresa no se ha podido logear' })
        }
    })

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
        Empleado.deleteMany({ empresa: empresaId }, (err) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            return res.status(200).send({ message: 'Empresa Eliminada', empresaEliminada: empresaDeleted })
        })
    })
}

module.exports = {
    RegistrarEmpresa,
    login,
    editarEmpresa,
    eliminarEmpresa
}