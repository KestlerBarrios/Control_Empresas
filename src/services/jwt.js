'use strict'

//Creacion del token y contenido

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'password'

exports.createToken = function(empresas) {
    var payload = {
        sub: empresas._id,
        nombre: empresas.nombre,
        usuario: empresas.usuario,
        email: empresas.email,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }
    return jwt.encode(payload, secret)
}