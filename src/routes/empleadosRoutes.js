'use strict'
const express = require('express')

const EmpleadoController = require('../controllers/empleadoController')

var api = express.Router()
api.post('/crear-empleado/:id', EmpleadoController.crearEmpleado)
api.put('/editar-empleado/:id', EmpleadoController.editarEmpleado)
api.delete('/eliminar-empleado/:id', EmpleadoController.eliminarEmpleado)
api.get('/buscar-empleado', EmpleadoController.buscarEmpleado)
api.get('/listar-empleados', EmpleadoController.listarEmpleados)

module.exports = api