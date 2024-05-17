const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_empleadosActive');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});
//Obtener solamente el empleado por Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * FROM tblEmpleados WHERE NumeroNomina = ' + id);
        res.json(result.recordset);
        //res.send('Empleado Encontrado Correctamente');
    } catch (err) {
        res.status(500).send('Error al encontrar Empleado');
    }
});

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query(`DELETE FROM tblEmpleados WHERE NumeroNomina = ${id}`);
        res.send('Empleado eliminado correctamente');
    } catch (err) {
        res.status(500).send('Error al eliminar el empleado');
    }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
    const { NumeroNomina, NombreEmpleado, NombreDepartamento, NombrePuesto, Ingreso, HorarioSemanal, TipoIngreso } = req.body;

    try {
        const sql = await db.getConnection();
        const request = new sql.Request();
        request.input('NumeroNomina', sql.Int, NumeroNomina);
        request.input('NombreEmpleado', sql.VarChar, NombreEmpleado);
        request.input('NombreDepartamento', sql.VarChar, NombreDepartamento);
        request.input('NombrePuesto', sql.VarChar, NombrePuesto);
        request.input('Ingreso', sql.Date, Ingreso);
        request.input('HorarioSemanal', sql.VarChar, HorarioSemanal);
        request.input('TipoIngreso', sql.VarChar, TipoIngreso);
        const result = await request.execute('stp_empleado_add');
        res.status(201).send('Empleado creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el empleado: ' + err.message);
    }
});

/*
router.post('/', async (req, res) => {
    const { NumeroNomina, 
        NombreEmpleado, 
        NombreDepartamento,
        NombrePuesto,
        Ingreso,
        HorarioSemanal,
        TipoIngreso
     } = req.body;

     var Numeronomina1 = parseInt(NumeroNomina, 10);
     console.log(Ingreso, Numeronomina1);

    try {
        const sql = await db.getConnection();
        const result = await sql.query(`EXEC stp_empleado_add ${Numeronomina1}, 
        '${NombreEmpleado}', 
        '${NombreDepartamento}', 
        '${NombrePuesto}',
        '2024-03-04',
        '${HorarioSemanal}',   
        '${TipoIngreso}', `);
        res.status(201).send('Empleado creado correctamente');
    } catch (err) {
        res.status(500).send('Error al crear el empleado');
    }
});*/

/*

// Actualizar un empleado
router.put('/:id', async (req, res) => {
    const { nombre, puesto, salario } = req.body;
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query(`UPDATE tblEmpleados SET nombre = '${nombre}', puesto = '${puesto}', salario = ${salario} WHERE id = ${id}`);
        res.send('Empleado actualizado correctamente');
    } catch (err) {
        res.status(500).send('Error al actualizar el empleado');
    }
});


*/

module.exports = router;
