const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

// Obtener todos los empleados all
router.get('/capacitacion', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_Capacitaciones');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

router.post('/capacitacion', async (req, res) => {
    const { NoNomina, NombreCapacitacion, FechaCapacitacion, CalificacionCapacitacion,
        ValoracionCapacitacion
    } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('FechaCapacitacion', sql.Date, FechaCapacitacion);
        request.input('CalificacionCapacitacion', sql.Decimal, CalificacionCapacitacion);
        request.input('ValoracionCapacitacion', sql.VarChar, ValoracionCapacitacion);


        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_capacitacionEmpleado_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Capacitacion del Empleado agregado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la capacitacion: ' + err.message });
    }

});

// Obtener todos los empleados Activos
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_Prueba2 Order by NoNomina');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});
// Obtener todos los empleados all
router.get('/all', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_EmpleadosAll Order by NoNomina');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

// Obtener todos los empleados all
router.get('/inactive', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_EmpleadosInactive Order by NoNomina');
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
        const result = await sql.query('Select * FROM V_EmpleadosActiveIdDepartamento WHERE NoNomina = ' + id);
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
        
        res.status(201).json({ message: "Empleado eliminado con éxito" });
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
    const { NoNomina, Nivel, NombrePuesto, TipoIngreso, Ingreso, HorarioSemanal,NSS, UMF, Sueldo,
        Nombre, Apellidos, Sexo, EstadoCivil, FechaNacimiento, EntidadNacimiento, CiudadNacimiento, CURP, RFC, 
        DomicilioIne, Poblacion, EntidadDireccion, CP, CorreoElectronico, NumeroTelefono1, NumeroTelefono2,
        NombreBeneficiario, Parentesco, FechaNacimientoBeneficiario, NumeroTelefonoEmergencia,
        IngresoImss, BajaImss
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
        request.input('Sueldo', sql.Decimal, Sueldo);
        request.input('IngresoImss', sql.Date, IngresoImss);
        request.input('BajaImss', sql.Date, BajaImss);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_personaall_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado creado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al crear el empleado: ' + err.message });
    }

});

//Recuperar Empleado
router.post('/recuperar', async (req, res) => {
   
    const { NoNomina
    } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('NoNomina', sql.Int, NoNomina);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_empleado_recuperar');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado Recuperado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al recuperar el empleado: ' + err.message });
    }

});



// Actualizar un empleado
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const { NoNomina, Nivel, NombrePuesto, TipoIngreso, Ingreso, HorarioSemanal,NSS, UMF, Sueldo,
        Nombre, Apellidos, Sexo, EstadoCivil, FechaNacimiento, EntidadNacimiento, CiudadNacimiento, CURP, RFC, 
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
        request.input('Sueldo', sql.Decimal, Sueldo);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_personaall_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Empleado Actualizado con éxito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el empleado: ' + err.message });
    }
    
});

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
    
});


///Capacitaciones




module.exports = router;
