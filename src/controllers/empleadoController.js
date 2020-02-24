'use strict'

const fs = require("fs");
const PDFDocument = require("pdfkit");
const Empleado = require('../models/Empleado')

function crearEmpleado(req, res) {
    var empleado = new Empleado()
    var empresaId = req.params.id
    var params = req.body

    if (params.nombre && params.numero) {
        empleado.nombre = params.nombre
        empleado.edad = params.edad
        empleado.puesto = params.puesto
        empleado.departamento = params.departamento
        empleado.numero = params.numero
        empleado.direccion = params.direccion
        empleado.empresa = empresaId

        empleado.save((err, empleadoGuardado) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el Empleado.' })
            if (empleadoGuardado) {
                res.status(200).send({ empleado: empleadoGuardado })
            } else {
                res.status(404).send({ message: 'No se ha podido registrar el Empleado' })
            }
        })
    } else {
        res.status(200).send({ message: 'Rellene todos los datos necesarios' })
    }
}

function editarEmpleado(req, res) {
    const empleadoId = req.params.id
    const params = req.body
    Empleado.findByIdAndUpdate(empleadoId, params, { new: true }, (err, empleadoActualizado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!empleadoActualizado) return res.status(404).send({ message: 'No se ha podido editar el Empleado' })
        return res.status(200).send({ empresa: empleadoActualizado })

    })
}

function eliminarEmpleado(req, res) {
    const empleadoId = req.params.id
    Empleado.findByIdAndDelete(empleadoId, (err, empleadoDeleted) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ message: 'Empleado Eliminado', empresaEliminada: empleadoDeleted })
    })

}

function buscarEmpleado(req, res) {
    var params = req.body
    let filtro = {}
    if (params.id) {
        filtro._id = params.id
    } else if (params.nombre) {
        filtro.nombre = { $regex: `.*${params.nombre}.*` }
    } else if (params.puesto) {
        filtro.puesto = { $regex: `.*${params.puesto}.*` }
    } else if (params.departamento) {
        filtro.departamento = { $regex: `.*${params.departamento}.*` }
    }
    Empleado.find(filtro).populate('empresa').exec((err, empleados) => {
        if (err) return res.status(500).send({ message: 'Error al listar lo Empleados' })
        if (empleados) {
            res.status(200).send({ empleado: empleados })
        } else {
            res.status(404).send({ message: 'No se ha podido listar a los Empleados' })
        }

    })

}

function listarEmpleados(req, res) {
    var params = req.body
    var empresaId = req.params.id
    Empleado.find(empresaId, {$regex:`.*${params.empresa}.*`}).exec((err, empleados) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        return res.status(200).send({ empleados: empleados.length })
    })
}

function createPDF(Empleado, ruta) {
    let doc = new PDFDocument({ margin: 50 });
    ruta = '/Kestler Barrios/ejemplo.pdf'
    generateHeader(doc);
    generateCustomerInformation(doc, Empleado);
    generateInvoiceTable(doc, Empleado);
    generateFooter(doc);
    doc.pipe(fs.createWriteStream(ruta));
    doc.end();

}

module.exports = {
    crearEmpleado,
    editarEmpleado,
    eliminarEmpleado,
    buscarEmpleado,
    listarEmpleados,
    createPDF
}
