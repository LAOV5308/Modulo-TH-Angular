const express = require('express');
const app = express();
const getConnection = require('./backend/ConexionDB/dbConfig');
const port = 3000;

app.use((req , res, next)=>{
    // Permisos
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH,PUT,  DELETE, OPTIONS");
  next();
});

app.get('/empleados', async (req, res) => {
    try {
        const sql = await getConnection();
        const result = await sql.query('SELECT * FROM Empleados');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

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