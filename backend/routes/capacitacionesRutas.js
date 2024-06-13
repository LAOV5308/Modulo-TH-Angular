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

// Obtener solo uno 
/*
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from tblNombreCapacitaciones where CodigoCapacitacion = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener el catalogo de Capacitaciones');
    }
});*/




//Guardar Una Nueva Capacitacion en el catalogo
router.post('/', async (req, res) => {
    const { CodigoCapacitacion, NombreCapacitacion, Origen, Estatus, 
        TipoCapacitacion, Duracion
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('Origen', sql.VarChar, Origen);
        request.input('Estatus', sql.VarChar, Estatus);
        request.input('TipoCapacitacion', sql.VarChar, TipoCapacitacion);
        request.input('Duracion', sql.Decimal, Duracion);
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