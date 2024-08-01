const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');



router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from tblBajas where NoNomina = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener bajas de empleados: ' + err.message });
    }
});

router.get('/incidencias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from tblIncidencias where NoNomina = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener bajas de empleados: ' + err.message });
    }
});



module.exports = router;