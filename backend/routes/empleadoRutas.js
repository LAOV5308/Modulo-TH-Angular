const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_EmpleadosActive Order by NoNomina');
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
        const result = await sql.query('Select * FROM V_EmpleadosActive WHERE NoNomina = ' + id);
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
        const pool = await getConnection();
        const request = pool.request();
        //const sql = await db.getConnection();

        request.input('NoNomina', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_empleado_delete');
        
        res.status(201).json({ message: "Empleado creado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el empleado: ' + err.message });
    }
});

// Crear un nuevo empleado

router.post('/', async (req, res) => {

    /*
    const { NombreDepartamento } = req.body;
    const { NombreResponsable } = req.body;
    
        
        const sql = await db.getConnection();
        const result = await sql.query('EXEC stp_departamento_add '+ NombreDepartamento + ', '+NombreResponsable);
        //res.status(201).send("Departamento creado con éxito");
        res.status(201).json({ message: "Departamento creado con éxito" });
*/

    const { Nombre, Apellidos, Sexo, EstadoCivil, FechaNacimiento, EntidadNacimiento, CiudadNacimiento, CURP, RFC, NSS, UMF,
        NoNomina, Nivel, NombrePuesto, TipoIngreso, Ingreso, HorarioSemanal,
        DomicilioIne, Poblacion, EntidadDireccion, CP, CorreoElectronico, NumeroTelefono1, NumeroTelefono2,
        NombreBeneficiario, Parentesco, FechaNacimientoBeneficiario, NumeroTelefonoEmergencia
    } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('Nombre', sql.VarChar, Nombre);
        request.input('Apellidos', sql.VarChar, Apellidos);
        request.input('Sexo', sql.VarChar, Sexo);
        request.input('EstadoCivil', sql.VarChar, EstadoCivil);
        request.input('FechaNacimiento', sql.Date, FechaNacimiento);
        request.input('EntidadNacimiento', sql.VarChar, EntidadNacimiento);
        request.input('CiudadNacimiento', sql.VarChar, CiudadNacimiento);
        request.input('CURP', sql.VarChar, CURP);
        request.input('RFC', sql.VarChar, RFC);
        request.input('NSS', sql.VarChar, NSS);
        request.input('UMF', sql.VarChar, UMF);
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('Nivel', sql.VarChar, Nivel);
        request.input('NombrePuesto', sql.VarChar, NombrePuesto);
        request.input('TipoIngreso', sql.VarChar, TipoIngreso);
        request.input('Ingreso', sql.Date, Ingreso);
        request.input('HorarioSemanal', sql.VarChar, HorarioSemanal);
        request.input('DomicilioIne', sql.VarChar, DomicilioIne);
        request.input('Poblacion', sql.VarChar, Poblacion);
        request.input('EntidadDireccion', sql.VarChar, EntidadDireccion);
        request.input('CP', sql.VarChar, CP);
        request.input('CorreoElectronico', sql.VarChar, CorreoElectronico);
        request.input('NumeroTelefono1', sql.VarChar, NumeroTelefono1);
        request.input('NumeroTelefono2', sql.VarChar, NumeroTelefono2);
        request.input('NombreBeneficiario', sql.VarChar, NombreBeneficiario);
        request.input('Parentesco', sql.VarChar, Parentesco);
        request.input('FechaNacimientoBeneficiario', sql.Date, FechaNacimientoBeneficiario);
        request.input('NumeroTelefonoEmergencia', sql.VarChar, NumeroTelefonoEmergencia);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_personaall_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado creado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al crear el empleado: ' + err.message });
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



// Actualizar un empleado
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const { Nombre, Apellidos, Sexo, EstadoCivil, FechaNacimiento, EntidadNacimiento, CiudadNacimiento, CURP, RFC, NSS, UMF, 
        Nivel, NombrePuesto, TipoIngreso, Ingreso, HorarioSemanal,
        DomicilioIne, Poblacion, EntidadDireccion, CP, CorreoElectronico, NumeroTelefono1, NumeroTelefono2,
        NombreBeneficiario, Parentesco, FechaNacimientoBeneficiario, NumeroTelefonoEmergencia
    } = req.body;


    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('Nombre', sql.VarChar, Nombre);
        request.input('Apellidos', sql.VarChar, Apellidos);
        request.input('Sexo', sql.VarChar, Sexo);
        request.input('EstadoCivil', sql.VarChar, EstadoCivil);
        request.input('FechaNacimiento', sql.Date, FechaNacimiento);
        request.input('EntidadNacimiento', sql.VarChar, EntidadNacimiento);
        request.input('CiudadNacimiento', sql.VarChar, CiudadNacimiento);
        request.input('CURP', sql.VarChar, CURP);
        request.input('RFC', sql.VarChar, RFC);
        request.input('NSS', sql.VarChar, NSS);
        request.input('UMF', sql.VarChar, UMF);
        request.input('NoNomina', sql.Int, id);
        request.input('Nivel', sql.VarChar, Nivel);
        request.input('NombrePuesto', sql.VarChar, NombrePuesto);
        request.input('TipoIngreso', sql.VarChar, TipoIngreso);
        request.input('Ingreso', sql.Date, Ingreso);
        request.input('HorarioSemanal', sql.VarChar, HorarioSemanal);
        request.input('DomicilioIne', sql.VarChar, DomicilioIne);
        request.input('Poblacion', sql.VarChar, Poblacion);
        request.input('EntidadDireccion', sql.VarChar, EntidadDireccion);
        request.input('CP', sql.VarChar, CP);
        request.input('CorreoElectronico', sql.VarChar, CorreoElectronico);
        request.input('NumeroTelefono1', sql.VarChar, NumeroTelefono1);
        request.input('NumeroTelefono2', sql.VarChar, NumeroTelefono2);
        request.input('NombreBeneficiario', sql.VarChar, NombreBeneficiario);
        request.input('Parentesco', sql.VarChar, Parentesco);
        request.input('FechaNacimientoBeneficiario', sql.Date, FechaNacimientoBeneficiario);
        request.input('NumeroTelefonoEmergencia', sql.VarChar, NumeroTelefonoEmergencia);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_personaall_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado Actualizado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el empleado: ' + err.message });
    }
    
});




module.exports = router;
