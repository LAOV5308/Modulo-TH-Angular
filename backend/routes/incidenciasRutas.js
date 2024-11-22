const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener todas las incidencias Activas
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_IncidenciasActive order by IdIncidencias DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

// Obtener todas las incidencias close
router.get('/close/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_IncidenciasClose order by IdIncidencias DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

// Obtener todas las incidencias
router.get('/all/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_IncidenciasAll order by IdIncidencias DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

//Obtener solamente el empleado por Id
router.post('/empleado', async (req, res) => {
    const { NoNomina } = req.body;

    try {
        const pool = await db.getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        const result = await request.execute('stp_V_IncidenciasOrdenar');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});


//Eliminar Incidencia
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdIncidencias', sql.Int, id);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_incidencias_delete');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incidencia eliminada con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la Incidencia: ' + err.message });
    }
});


// Obtener todos los empleados all
/*
router.get('/all', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_EmpleadosAll Order by NoNomina');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});*/


//Obtener solamente el empleado por Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * FROM V_IncidenciasAll WHERE IdIncidencias = ' + id);
        res.json(result.recordset);
        //res.send('Empleado Encontrado Correctamente');
    } catch (err) {
        res.status(500).send('Error al encontrar la Incidencia');
    }
});

// Eliminar un empleado
/*
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const request = pool.request();
        //const sql = await db.getConnection();

        request.input('NoNomina', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_empleado_delete');
        
        res.status(201).json({ message: "Empleado eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el empleado: ' + err.message });
    }
});
*/
// Crear una Nueva Incidencia
router.post('/', async (req, res) => {


    const { NoNomina, Motivo, FechaInicio, FechaFin, CategoriaIncidencia, FolioAlta, FolioBaja} = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Motivo', sql.VarChar, Motivo);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        request.input('CategoriaIncidencia', sql.VarChar, CategoriaIncidencia);
        request.input('FolioAlta', sql.VarChar, FolioAlta);
        request.input('FolioBaja', sql.VarChar, FolioBaja);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_incidencias_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incidencia creada con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al crear la Incidencia: ' + err.message });
    }

});




// Cerrar Incidencia
/*
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdIncidencias', sql.Int, id);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_incidencias_close');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incidencia dada de baja con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al cerrar la Incidencia: ' + err.message });
    }
});*/

// cerrar Incidencia
router.put('/close/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdIncidencias', sql.Int, id);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_incidencias_close');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incidencia dada de baja con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al cerrar la Incidencia: ' + err.message });
    }
});

// Actualizar Incidencia
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const { 
        Motivo, FechaInicio, FechaFin, CategoriaIncidencia, FolioAlta, FolioBaja
    } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdIncidencias', sql.Int, id);
        request.input('Motivo', sql.VarChar, Motivo);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        request.input('CategoriaIncidencia', sql.VarChar, CategoriaIncidencia);
        request.input('FolioAlta', sql.VarChar, FolioAlta);
        request.input('FolioBaja', sql.VarChar, FolioBaja);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_incidencias_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Incidencia actualizada con exito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la Incidencia: ' + err.message });
    }
});


/*
router.put('/bajas/:id', async (req, res) => {

    const { id } = req.params;

    const { 
        FechaSalida, TipoBaja, Finiquito
    } = req.body;


    try {
        const pool = await getConnection();
        const request = pool.request();

        // Convertir la fecha a un formato adecuado para SQL Server
        //const formattedFechaSalida = new Date(FechaSalida).toISOString().split('T')[0];

        request.input('NoNomina', sql.Int, id);
        request.input('FechaSalida', sql.Date, FechaSalida);
        request.input('TipoBaja', sql.VarChar, TipoBaja);
        request.input('Finiquito', sql.Decimal, Finiquito);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_baja_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado Dado De Baja Con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al dar de baja empleado: ' + err.message });
    }
    
});*/


module.exports = router;
