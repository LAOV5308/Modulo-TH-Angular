const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

//const Departamento = require('../models/empleado.model')

// Obtener todo el catalogo de capacitaciones
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CatalogoCapacitacionesActive');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener el catalogo de Capacitaciones');
    }
});

router.get('/programacionactive', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CapacitacionesProgramadasActivas');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.get('/programacioninactive', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CapacitacionesProgramadasInactivas');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.get('/programacionall', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CapacitacionesProgramadasAll');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});
router.get('/programacionall/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CapacitacionesProgramadasAll where IdProgramacionFecha = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.get('/programaciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_SuscripcionCapacitaciones where IdProgramacionFecha = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.post('/programaciones/', async (req, res) => {
    const { NoNomina, IdProgramacionFecha
     } = req.body;

    try {
        const pool = await getConnection(); 
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('IdProgramacionFecha', sql.Int, IdProgramacionFecha);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_suscripcioncapacitacion_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Agregado ala suscrpcion de Capacitaciones con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la suscripcion: ' + err.message });
    }
    
});



// Obtener solo uno 

router.get('/single/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_CatalogoCapacitacionesActive where CodigoCapacitacion = '+id);
        res.json(result.recordset);

        /*
        request.input('CodigoCapacitacion', sql.VarChar, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_capacitacionnombre_getbyCodigoCapacitacion');
        res.json(result.recordset);*/
    } catch (err) {
        res.status(500).send('Error al obtener el single de catalogo de Capacitaciones');
    }
});





//Guardar Una Nueva Capacitacion en el catalogo
router.post('/', async (req, res) => {
    const { NombreCapacitacion, Origen, Estatus, 
        TipoCapacitacion, Duracion, Color
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('Origen', sql.VarChar, Origen);
        request.input('Estatus', sql.VarChar, Estatus);
        request.input('TipoCapacitacion', sql.VarChar, TipoCapacitacion);
        request.input('Duracion', sql.Decimal, Duracion);
        request.input('Color', sql.VarChar, Color);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_capacitacionnombre_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Agregado al catalogo de Capacitaciones con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar al catalogo: ' + err.message });
    }
    
});

// Eliminar un departamento por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('CodigoCapacitacion', sql.VarChar, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_capacitacionnombre_delete');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Catalogo Capacitaciones Eliminado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar del Catalogo: ' + err.message });
    }


});

// Eliminar una suscripcion por id
router.delete('/programaciones/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdSuscripcionCapacitacion', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_suscripcioncapacitacion_delete');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Eliminado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar: ' + err.message });
    }


});


// Actualizar un departamento por ID
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const { NombreCapacitacion, Origen, Estatus, 
        TipoCapacitacion, Duracion
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('CodigoCapacitacion', sql.VarChar, id);

        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('Origen', sql.VarChar, Origen);
        request.input('Estatus', sql.VarChar, Estatus);
        request.input('TipoCapacitacion', sql.VarChar, TipoCapacitacion);
        request.input('Duracion', sql.Decimal, Duracion);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_capacitacionnombre_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Catalogo actualizado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el Catalogo: ' + err.message });
    }


});


// Añadir más rutas para crear, actualizar y eliminar departamentos

module.exports = router;