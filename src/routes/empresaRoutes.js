'use strict'
const express = require('express')

const EmpresaController = require('../controllers/empresaController')
const md_auth = require('../middlewares/authenticated')


var api = express.Router()
api.post('/registrar-empresa', EmpresaController.RegistrarEmpresa)
api.post('login', EmpresaController.login)
api.put('/editar-empresa/:id', md_auth.ensureAuth, EmpresaController.editarEmpresa)
api.delete('/eliminar-empresa/:id',md_auth.ensureAuth, EmpresaController.eliminarEmpresa)

module.exports = api