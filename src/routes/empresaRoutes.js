'use strict'
const express = require('express')

const EmpresaController = require('../controllers/empresaController')

var api = express.Router()
api.post('/crear-empresa', EmpresaController.crearEmpresa)
api.put('/editar-empresa/:id', EmpresaController.editarEmpresa)
api.delete('/eliminar-empresa/:id', EmpresaController.eliminarEmpresa)

module.exports = api