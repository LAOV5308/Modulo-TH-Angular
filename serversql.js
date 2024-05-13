const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const empleadosRutas = require('./backend/routes/empleadoRutas')
const departamentosRutas = require('./backend/routes/departamentoRutas')
const getConnection = require('./backend/ConexionDB/dbConfig');
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
app.use('/empleados', empleadosRutas);
app.use('/departamentos', departamentosRutas);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

/*
app.use(express.json());

app.use('/', apiRouter);  // Usa las rutas definidas en api.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/