'use strict'

const Producto = require('../models/Producto')
const xl = require('excel4node');

function agregarProductos(req, res) {
    var producto = new Producto()
    let sucursalId = req.params.sucursalId
    let params = req.body
    var empresaId = req.params.empresaId

    if (params.nombre == producto.nombre) {
        producto.cantidad = producto.cantidad + params.cantidad
        
    } else {
        producto.nombre = params.nombre
        producto.cantidad = params.cantidad
    }
        producto.sucursal = sucursalId
        producto.empresa = empresaId
        producto.save((err, productoGuardado) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (!productoGuardado) return res.status(404).send({ message: `Error al agregar ${params.nombre}` })
            return res.status(200).send({ message: 'Producto Guardado', producto: productoGuardado })
        })

}


function buscarProductos(req, res) {
    var params = req.body
    let filtro = {}
    if (params.nombre) {
        filtro.nombre = { $regex: `.*${params.nombre}.*` }
    }

    Producto.find(filtro).populate('empresa', 'sucursal').exec((err, productos) => {
        if (err) return res.status(500).send({ message: 'Error al listar los productos' })
        if (productos) {
            res.status(200).send({ productos: productos })
        } else {
            res.status(404).send({ message: 'No se ha podido listar los productos' })
        }
    })
}


function crearExcel(req, res) {
    var producto = new Producto()   
    var wb = new xl.Workbook();
    var style = wb.createStyle({
        font: {
          color: '#FF0800',
          size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
   });
    var ws = wb.addWorksheet('Sheet 1');
    ws.cell(1.1).string(`${producto}`).style(style)
    wb.write('../Control_Empresas/src/Excel.xlsx');    
}
module.exports = {
    agregarProductos,
    buscarProductos,
    crearExcel
}