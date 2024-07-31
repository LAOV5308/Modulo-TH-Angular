const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from tblContactoEmergencia');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});


module.exports = router;