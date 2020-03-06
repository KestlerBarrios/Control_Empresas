'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')

const EMPRESA_ROUTES = require('./routes/empresaRoutes')
const EMPLEADO_ROUTES = require('./routes/empleadosRoutes')
const SUCURSAL_ROUTES = require('./routes/sucursalRoutes')
const PRODUCTO_ROUTES = require('./routes/productoRoutes')
// const USER_ROUTES = require('./routes/userRoutes')


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors())
app.use('/api', EMPRESA_ROUTES)
app.use('/api', EMPLEADO_ROUTES)
app.use('/api', SUCURSAL_ROUTES)
app.use('/api', PRODUCTO_ROUTES )
// app.use('/api', USER_ROUTES)

module.exports = app