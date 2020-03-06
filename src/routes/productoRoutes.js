'use strict'

const express = require('express')

const ProdutoController = require('../controllers/productoController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/agregar-productos/:empresaId/:sucursalId', ProdutoController.agregarProductos)
api.get('/listar-productos', ProdutoController.buscarProductos)
api.get('/crear-excel', ProdutoController.crearExcel)


module.exports = api