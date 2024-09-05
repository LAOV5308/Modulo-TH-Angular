const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

//Obtener cantidad de empleados por departamentos
router.get('/departamentos', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_EmpleadosPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});

//Obtener cantidad de empleados por EstadoCivil
router.get('/estadocivil', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_EmpleadosPorEstadoCivil');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});


router.post('/incidencias', async (req, res) => {
    const { Periodo } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_Incidencias');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

router.post('/capacitaciones', async (req, res) => {
    const { Periodo } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_Capacitaciones');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

router.post('/contrataciones', async (req, res) => {
    const { Periodo } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_CantidadContrataciones');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});


router.get('/edades', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_Edades');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});

module.exports = router;