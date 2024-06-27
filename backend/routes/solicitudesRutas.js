const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener solicitudesActivas
router.get('/aceptadas/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_SolicitudesAceptadas');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener las solicitudes de la base de datos');
    }
});

// Obtener solicitudesProceso
router.get('/proceso/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_SolicitudesProceso');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener las solicitudes de la base de datos');
    }
});
// Obtener solicitudesRechazadas
router.get('/rechazadas/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_SolicitudesRechazadas');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener las solicitudes de la base de datos');
    }
});


// Crear un nuevo Puesto

router.post('/', async (req, res) => {

    const { Nombre, Apellidos, Sexo, EstadoCivil, FechaNacimiento, EntidadNacimiento, CiudadNacimiento, CURP, RFC, NSS, UMF, 
        PuestoSolicitado, PuestoOfrecido, HorarioSemanal,Escolaridad, Experiencia, FechaSolicitud,
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
        request.input('PuestoSolicitado', sql.VarChar, PuestoSolicitado);
        request.input('PuestoOfrecido', sql.VarChar, PuestoOfrecido);
        request.input('HorarioSemanal', sql.VarChar, HorarioSemanal);
        request.input('Escolaridad', sql.VarChar, Escolaridad);
        request.input('Experiencia', sql.VarChar, Experiencia);
        request.input('FechaSolicitud', sql.Date, FechaSolicitud);
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
        const result = await request.execute('stp_solicitud_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Solicitud creada con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al crear la solicitud: ' + err.message });
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
/*
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
*/



module.exports = router;