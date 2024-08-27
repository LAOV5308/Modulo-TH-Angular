const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

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
    const { NoNomina,Fecha, Comentarios} = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Fecha', sql.Date, Fecha);
        request.input('Comentarios', sql.VarChar, Comentarios);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_vacacionfecha_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Vacacion creada con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la vacacion: ' + err.message });
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdVacacion', sql.Int, id);
        const result = await request.execute('stp_vacacionfecha_delete');
        res.status(201).json({ message: "Vacacion Dada de baja con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al dar de baja: ' + err.message });
    }
});


module.exports = router;