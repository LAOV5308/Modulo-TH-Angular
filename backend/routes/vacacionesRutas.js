const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener Dias de Vacaciones por periodo
router.post('/periodos', async (req, res) => {
    const { NoNomina, Periodo } = req.body; // Aquí se usa req.body para recibir los datos

    try {
        const sql = await db.getConnection();
        //const result = await sql.query("SELECT * FROM tblVacaciones WHERE NoNomina = " + NoNomina + " AND Periodo = " + Periodo);
        const result = await sql.query("SELECT * FROM tblVacaciones WHERE EstadoVacacion = 1 and NoNomina = " + NoNomina);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});




router.post('/all', async (req, res) => {
    const { NoNomina, Periodo } = req.body; // Aquí se usa req.body para recibir los datos

    try {
        const sql = await db.getConnection();
        const result = await sql.query("SELECT * FROM tblVacaciones WHERE NoNomina = " + NoNomina + " AND Periodo = " + Periodo);
        //const result = await sql.query("SELECT * FROM tblVacaciones WHERE NoNomina = " + NoNomina);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});



//Obtener Vacaciones por empleado
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from tblFechasVacaciones where EstadoVacacion = 1 AND NoNomina = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error');
    }
});




router.post('/rango', async (req, res) => {
    const { NoNomina, FechaInicio, FechaFin } = req.body;

    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        const result = await request.execute('stp_V_Vacaciones');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

router.post('/', async (req, res) => {
    const { NoNomina,Fecha, Comentarios, Periodo, IdVacacion} = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Fecha', sql.Date, Fecha);
        request.input('Comentarios', sql.VarChar, Comentarios);
        request.input('Periodo', sql.VarChar, Periodo);
        request.input('IdVacacion', sql.Int, IdVacacion);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_vacacionfecha_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Vacacion creada con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la vacacion: ' + err.message });
    }

});

router.post('/increase', async (req, res) => {
    const { IdVacacion} = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdVacacion', sql.Int, IdVacacion);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_vacaciondias_increase');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incrementada con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al Incrementar: ' + err.message });
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdFechaVacacion', sql.Int, id);
        const result = await request.execute('stp_vacacionfecha_delete');
        res.status(201).json({ message: "Vacacion Dada de baja con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al dar de baja: ' + err.message });
    }
});


router.post('/fechasvacacionesperiodo', async (req, res) => {
    const { NoNomina, Periodo } = req.body;

    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_FechasVacacionesPeriodo');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

router.post('/vacacionesperiodo', async (req, res) => {
    const { NoNomina, Periodo } = req.body;

    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Periodo', sql.VarChar, Periodo);
        const result = await request.execute('stp_V_VacacionesPeriodo');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

// Actualizar Dias de la Vacacion
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { DiasDisponibles, DiasUtilizados} = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdVacacion', sql.Int, id);
        request.input('DiasDisponibles', sql.Int, DiasDisponibles);
        request.input('DiasUtilizados', sql.Int, DiasUtilizados);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_vacaciondias_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Vacacion Actualizada con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar: ' + err.message });
    }
    
});


router.post('/diasvacaciones', async (req, res) => {
    const { NoNomina } = req.body;

    try {
        /*const sql = await db.getConnection();
        const request = sql.request();*/
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        const result = await request.execute('stp_V_DiasDisponibles');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});

module.exports = router;