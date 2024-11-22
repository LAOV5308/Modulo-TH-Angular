const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener todos los puestos
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_PuestosActive');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener Puestos de la base de datos');
    }
});

//Obtener solamente el puesto por Id
/*
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_PuestosActive WHERE IdPuesto = ' + id);
        res.json(result.recordset);
        //res.send('Empleado Encontrado Correctamente');
    } catch (err) {
        res.status(500).send('Error al encontrar Los Puestos');
    }
});*/

//Obtener todos los puestos solamente el puesto por Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const request = pool.request();
        //const sql = await db.getConnection();
        request.input('IdDepartamento', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_puesto_getDepartamentobyid');
        res.json(result.recordset);
        //res.send('Empleado Encontrado Correctamente');
    } catch (err) {
        res.status(500).send('Error al encontrar Los Puestos');
    }
});


// Eliminar un Puesto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const request = pool.request();
        //const sql = await db.getConnection();

        request.input('IdPuesto', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_puesto_delete');
        
        res.status(201).json({ message: "Puesto eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el Puesto: ' + err.message });
    }
});

// Crear un nuevo Puesto

router.post('/', async (req, res) => {
    const { NombrePuesto, NombreDepartamento} = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NombrePuesto', sql.VarChar, NombrePuesto);
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_puesto_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Puesto creado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al crear el puesto: ' + err.message });
    }

});




// Actualizar un puesto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { NombrePuesto, NombreDepartamento} = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdPuesto', sql.Int, id);
        request.input('NombrePuesto', sql.VarChar, NombrePuesto);
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_puesto_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado Actualizado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el puesto: ' + err.message });
    }
    
});




module.exports = router;




