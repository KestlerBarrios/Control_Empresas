'use strict'

const Producto = require('../models/Producto')

function agregarProductos(req, res) {
    let sucursalId = req.params.sucursalId
    let params = req.body
    var empresaId = req.params.empresaId

    if (params.nombre) {
        producto.nombre = params.nombre
    }
    producto.sucursal = sucursalId
    producto.empresa = empresaId
    Producto.save((err, productoGuardado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!productoGuardado) return res.status(404).send({ message: `Error al agregar ${params.nombre}` })
        return res.status(200).send({ message: 'Producto Guardado', sucursal: ProductoGuardado })
    })

}


function buscarProductos(req, res) {
    var params = req.body
    let filtro = {}
    if (params.nombre) {
        filtro.nombre = { $regex: `.*${params.nombre}.*` }
    }
    Sucursal.find(filtro).exec((err, productos) => {
        if (err) return res.status(500).send({ message: 'Error al listar los productos' })
        if (productos) {
            res.status(200).send({ productos: productos })
        } else {
            res.status(404).send({ message: 'No se ha podido listar los productos' })
        }
    })
}

module.exports = {
    agregarProductos
}