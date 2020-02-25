'use strict'

const express = require('express')

const SucursalController = require('../controllers/sucursalController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/crear-sucursal', md_auth.ensureAuth, SucursalController.crearSucursal)
api.put('/editar-sucursal', md_auth.ensureAuth, SucursalController.editarSucursal)
api.delete('/eliminar-sucursal', md_auth.ensureAuth, SucursalController.eliminarSucursal)


module.exports = api