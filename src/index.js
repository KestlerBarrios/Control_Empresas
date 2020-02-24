'use strict'

const mongoose = require('mongoose')
const app = require('./app')

const DateActual = new Date()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/ControlEmpresas', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se conecto con la Base de Datos');
    app.set('port', process.env.PORT || 3000)
    app.listen(app.get('port'), () => {
        console.log(`El servidor esta en el puerto: ${app.get('port')}`);
    })
}).catch(err => console.error(err))