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

//Obtener cantidad de empleados por departamentos
router.get('/rangoantiguedadactive', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_RangosAntiguedad');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});



//Obtener cantidad de empleados por departamentos
router.get('/rangoantiguedadsalidas', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_RangosAntiguedadSalidas');
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

router.get('/bajas', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_Bajas');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});

router.get('/bajasdepartamento', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_BajasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});




//Obtener Cantidad de Cambios Por Departamento
router.get('/cambiospordepartamento', async (req, res) => {
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CambiosDeDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});


router.post('/faltasdepartamento', async (req, res) => {
    const { FechaInicio, FechaFin } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_FaltasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});


//Obtener Cantidad de Incidencias Por Departamento
router.post('/incidenciaspordepartamento', async (req, res) => {

    const { FechaInicio, FechaFin } = req.body;
    
    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_IncidenciasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});



//Obtener Cantidad de Incidencias Por Departamento
router.post('/bajaspordepartamento', async (req, res) => {

    const { FechaInicio, FechaFin } = req.body;
    
    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_BajasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});



//Obtener Cantidad de Salidas Por Edades y Mes
router.post('/salidasedades', async (req, res) => {
    const { Periodo } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_SalidasRangoEdad');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

//Obtener Suma de Incidencias por Departamento de  Mes
router.post('/sumaincidencias', async (req, res) => {
    const { Periodo } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_DiasIncidenciasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

//Obtener Suma de Horas Capacitacion por Departamento
router.post('/horasdepartamento', async (req, res) => {
    const { FechaInicio, FechaFin } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_HorasCapacitacionDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});



router.post('/diasincidenciasdepartamento', async (req, res) => {
    const { FechaInicio, FechaFin } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_IncidenciasDiasPorDepartamento');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});


module.exports = router;