const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const empleadosRutas = require('./backend/routes/empleadoRutas')
const departamentosRutas = require('./backend/routes/departamentoRutas')
const puestosRutas = require('./backend/routes/puestoRutas')
const incidenciasRutas = require('./backend/routes/incidenciasRutas')
const capacitacionesRutas = require('./backend/routes/capacitacionesRutas')
const usuariosRutas = require('./backend/routes/usuariosRutas');
const solicitudesRutas = require('./backend/routes/solicitudesRutas');
const vacacionesRutas = require('./backend/routes/vacacionesRutas');
const bajasRutas = require('./backend/routes/bajasRutas')
const dashboardRutas = require('./backend/routes/dashboardRutas')
const faltasRutas = require('./backend/routes/faltasRutas')
const reportesRutas = require('./backend/routes/reportesRutas')

const {sql, getConnection}= require('./backend/ConexionDB/dbConfig');
const port = 3000;


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();

});

app.use(bodyParser.json());


//Usar las rutas
app.use('/departamentos', departamentosRutas);
app.use('/empleados', empleadosRutas);
app.use('/puestos', puestosRutas);
app.use('/incidencias', incidenciasRutas);
app.use('/capacitaciones', capacitacionesRutas);
app.use('/usuarios', usuariosRutas);
app.use('/solicitudes', solicitudesRutas);
app.use('/vacaciones', vacacionesRutas);
app.use('/bajas', bajasRutas);
app.use('/dashboard', dashboardRutas);
app.use('/faltas', faltasRutas);
app.use('/reportes', reportesRutas);


app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
  });

/*app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});*/


/*
app.use(express.json());

app.use('/', apiRouter);  // Usa las rutas definidas en api.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/