const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');



router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_Reportes');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los reportes: ' + err.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_Reportes where IdReporte = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener bajas de empleados: ' + err.message });
    }
});


//Agregar Reporte
router.post('/', async (req, res) => {

    const { NoNomina, MotivoReporte, PersonaReporto, FechaReporte, SancionAplicada, NotasTalentoHumano} = req.body;
    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('MotivoReporte', sql.VarChar, MotivoReporte);
        request.input('PersonaReporto', sql.VarChar, PersonaReporto);
        request.input('FechaReporte', sql.Date, FechaReporte);
        request.input('SancionAplicada', sql.VarChar, SancionAplicada);
        request.input('NotasTalentoHumano', sql.VarChar, NotasTalentoHumano);
        const result = await request.execute('stp_reporte_add');
        res.status(201).json({ message: "Reporte agregado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});



//Agregar Reporte
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    const { NoNomina, MotivoReporte, PersonaReporto, FechaReporte, SancionAplicada, NotasTalentoHumano} = req.body;
    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('IdReporte', sql.Int, id);

        request.input('NoNomina', sql.Int, NoNomina);
        request.input('MotivoReporte', sql.VarChar, MotivoReporte);
        request.input('PersonaReporto', sql.VarChar, PersonaReporto);
        request.input('FechaReporte', sql.Date, FechaReporte);
        request.input('SancionAplicada', sql.VarChar, SancionAplicada);
        request.input('NotasTalentoHumano', sql.VarChar, NotasTalentoHumano);
        const result = await request.execute('stp_reporte_update');
        res.status(201).json({ message: "Reporte actualizado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

//Dar de Baja Reporte
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('IdReporte', sql.Int, id);
        const result = await request.execute('stp_reporte_delete');
        res.status(201).json({ message: "Reporte dado de baja con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});


/*
router.get('/incidencias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from tblIncidencias where NoNomina = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener bajas de empleados: ' + err.message });
    }
});*/



module.exports = router;