const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

//const Departamento = require('../models/empleado.model')

// Obtener todos los departamentos
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('exec stp_departamento_getactive');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener departamentos');
    }
});

//Guardar Departamento
router.post('/', async (req, res) => {
    const { NombreDepartamento, NombreResponsable } = req.body;
    
    try {
        
        /*const sql = await db.getConnection();
        const result = await sql.query('EXEC stp_departamento_add '+ NombreDepartamento + ', '+NombreResponsable);*/
        const pool = await getConnection();
        const request = pool.request();
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);
        request.input('NombreResponsable', sql.VarChar, NombreResponsable);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_departamento_add');
        //res.status(201).send("Departamento creado con éxito");
        res.status(201).json({ message: "Departamento creado con éxito" });

        //res.json(result);
        //res.json(result);
        /*
        if (result.rowsAffected[0] > 0) {
            res.send('Departamento Creado correctamente');
            //res.json(result);
        } else {
            res.status(404).send('Departamento no encontrado');
        }*/
        /*
        const sql = await db.getConnection();
        const request = new sql.Request();
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);
        const result = await request.execute('stp_departamento_add');
        //const result = await request.query('EXEC stp_departamento_add '+ NombreDepartamento);
        res.status(201).send('Departamento creado correctamente');*/
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el Departamento: ' + err.message});
    }
});

// Eliminar un departamento por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Captura el ID desde la URL
    try {
        const sql = await db.getConnection();
        const result = await sql.query('exec stp_departamento_delete '+id);
        if (result.rowsAffected[0] > 0) {
            res.status(201).json({ message: "Departamento eliminado Con exito" });
        } else {
            res.status(204).json({ message: "Departamento no encontrado" });
        }
    } catch (err) {
        console.error('Error al eliminar el departamento:', err);
        res.status(500).send('Error al eliminar el departamento');
    }
});

// Actualizar un departamento por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { NombreDepartamento } = req.body;
    const { NombreResponsable } = req.body;

    if (!NombreDepartamento) {
        return res.status(400).json({ message: "Datos de entrada no válidos" });
    }
    try {
        const sql = await db.getConnection();
        /*
        
        const request = new sql.Request(sql);
        request.input('IdDepartamento', sql.Int, id);
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);
        const result = await request.execute('stp_departamento_update');*/

        const result = await sql.query('EXEC stp_departamento_update '+ id +' , '+NombreDepartamento+' , '+NombreResponsable);
        
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Departamento actualizado con éxito" });
        } else {
            res.status(404).json({ message: "Departamento no encontrado" });
        }
    } catch (err) {
        console.error('Error al actualizar el departamento:', err);
        res.status(500).json({ message: 'Error al actualizar el departamento: ' + err.message});
    }
});


// Añadir más rutas para crear, actualizar y eliminar departamentos

module.exports = router;