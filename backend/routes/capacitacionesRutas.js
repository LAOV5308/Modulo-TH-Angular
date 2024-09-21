const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

//const Departamento = require('../models/empleado.model')

// Obtener todo el catalogo de capacitaciones
router.get('/', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_ProgramacionCapacitacionActiveHoras');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener el catalogo de Capacitaciones');
    }
});

//Falta Filrtrar
router.get('/programacionactive', async (req, res) => {
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_ProgramacionCapacitacion where IdEstadoProgramacionCapacitacion=1');
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
        const result = await sql.query('Select * from V_ProgramacionCapacitacion where IdEstadoProgramacionCapacitacion=1 and IdProgramacionFecha = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.get('/programacionfechaall/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('Select * from V_ProgramacionCapacitacion where IdEstadoProgramacionCapacitacion=1 and IdProgramacionCapacitacion = '+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

// Eliminar un departamento por ID
router.delete('/programacionactive/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdProgramacionFecha', sql.Int, id);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_programacionfecha_delete');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Programacion Eliminada con exito" });


    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar: ' + err.message });
    }


});

router.get('/programaciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_SuscripcionCapacitaciones where IdProgramacionCapacitacion ='+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener la programacion de Capacitaciones');
    }
});

router.get('/calificaciones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await db.getConnection();
        const result = await sql.query('select * from V_Calificaciones where IdProgramacionCapacitacion ='+id);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener las calificaciones');
    }
});


router.post('/programaciones/', async (req, res) => {
    const { NoNomina, IdProgramacionCapacitacion
     } = req.body;

    try {
        const pool = await getConnection(); 
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('IdProgramacionCapacitacion', sql.Int, IdProgramacionCapacitacion);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_suscripcioncapacitacion_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Agregado ala suscrpcion de Capacitaciones con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la suscripcion: ' + err.message });
    }
    
});

router.post('/evaluar/', async (req, res) => {
    const { NoNomina, IdProgramacionCapacitacion, Calificacion, Estatus, Asistio, Comentario
     } = req.body;

    try {
        const pool = await getConnection(); 
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NoNomina', sql.Int, NoNomina);
        request.input('IdProgramacionCapacitacion', sql.Int, IdProgramacionCapacitacion);
        request.input('Calificacion', sql.Decimal, Calificacion);
        request.input('Estatus', sql.Bit, Estatus);
        request.input('Asistio', sql.Bit, Asistio);
        request.input('Comentario', sql.VarChar, Comentario);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_evaluacion_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Evaluado con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al Evaluarlo: ' + err.message });
    }
    
});




//Obtener los Empleados por Capacitacione
router.post('/capacitacionempleado', async (req, res) => {
    const { NoNomina
     } = req.body;

    try {
        const pool = await getConnection(); 
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NoNomina', sql.Int, NoNomina);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_V_CapacitacionesEmpleados');
        //const result = await request.execute('stp_prueba_add');
        res.json(result.recordset);
        
    } catch (err) {
        res.status(500).json({ message: 'Error al Evaluarlo: ' + err.message });
    }
    
});


//Obtener las capacitaciones en un rango de fecha
router.post('/consultacapacitaciones', async (req, res) => {
    const { FechaInicio, FechaFin
     } = req.body;

    try {
        const pool = await getConnection(); 
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_ConsultarCapacitaciones');
        //const result = await request.execute('stp_prueba_add');
        res.json(result.recordset);
        
    } catch (err) {
        res.status(500).json({ message: 'Error al Evaluarlo: ' + err.message });
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
//AQUI NOS QUEDAMOS CON AGREGAR COLOR

router.post('/', async (req, res) => {
    const { NombreCapacitacion, Origen, Frecuencia, FechaInicio,
        FechaFin, HoraInicio, HoraFin, PersonaImparte, Comentarios, Color, Evaluacion, Horas
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('Origen', sql.VarChar, Origen);
        request.input('Frecuencia', sql.VarChar, Frecuencia);
        request.input('Fecha', null);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        request.input('HoraInicio', HoraInicio);
        request.input('HoraFin', HoraFin);
        request.input('PersonaImparte', sql.VarChar, PersonaImparte);
        request.input('Comentarios', sql.VarChar, Comentarios);
        request.input('Color', sql.VarChar, Color);
        request.input('Evaluacion', sql.Bit, Evaluacion);

         // Output
         request.output('IdProgramacionCapacitacion', sql.Int);

         // Ejecutar el procedimiento almacenado
         const result = await request.execute('stp_programacioncapacitacion_add');
         
         // Obtener el valor de la salida (output)
         const IdProgramacionCapacitacion = result.output.IdProgramacionCapacitacion;
        //const result = await request.execute('stp_prueba_add');

        // Responder con el ID generado o existente
        res.status(201).json({ 
            message: "Agregado al catalogo de Capacitaciones con éxito",
            IdProgramacionCapacitacion 
        });

    } catch (err) {
        res.status(500).json({ message: 'Error al agregar al programar Capacitacion: ' + err.message });
    }
    
});


//ProcedimientoAlmacenado para fecha de Rango
router.post('/fecha', async (req, res) => {
    const { IdProgramacionCapacitacion, Fecha, Horas
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('IdProgramacionCapacitacion', sql.Int, IdProgramacionCapacitacion);
        request.input('Fecha', sql.Date, Fecha);
        request.input('Horas', sql.Float, Horas);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_programacioncapacitacion_add_fecha');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Exito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar: ' + err.message });
    }
    
});


//ProcedimientoAlmacenado para fecha de Rango
router.post('/rango', async (req, res) => {
    const { IdProgramacionCapacitacion,FechaInicio,
        FechaFin, Horas
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('IdProgramacionCapacitacion', sql.Int, IdProgramacionCapacitacion);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        request.input('Horas', sql.Float, Horas);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_programacioncapacitacion_add_rango');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Agregado al catalogo de Capacitaciones con éxito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar al programar Capacitacion: ' + err.message });
    }
    
});


router.post('/asistencia', async (req, res) => {
    const { IdProgramacionCapacitacion, NoNomina
     } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
        ///request.input('CodigoCapacitacion', sql.VarChar, CodigoCapacitacion);
        request.input('IdProgramacionCapacitacion', sql.Int, IdProgramacionCapacitacion);
        request.input('NoNomina', sql.Int, NoNomina);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_asistenciaCapacitacion_add');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Asistencia Agregada con exito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar la asistencia: ' + err.message });
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


// Actualizar programacion por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        NombreCapacitacion, Origen, Frecuencia, Fecha,FechaInicio,
        FechaFin, HoraInicio, HoraFin, PersonaImparte, Comentarios, Color, Evaluacion, Horas
     } = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdProgramacionCapacitacion', sql.Int, id);
        request.input('NombreCapacitacion', sql.VarChar, NombreCapacitacion);
        request.input('Origen', sql.VarChar, Origen);
        request.input('Frecuencia', sql.VarChar, Frecuencia);
        /*request.input('Fecha', sql.Date, Fecha);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        request.input('HoraInicio', HoraInicio);
        request.input('HoraFin', HoraFin);*/
        request.input('PersonaImparte', sql.VarChar, PersonaImparte);
        request.input('Comentarios', sql.VarChar, Comentarios);
        request.input('Color', sql.VarChar, Color);
        request.input('Evaluacion', sql.Bit, Evaluacion);
        request.input('Horas', sql.Float, Horas);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_programacioncapacitacion_update');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Actualizado con exito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el Catalogo: ' + err.message });
    }
});


router.put('/actualizarfechas/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        Frecuencia, Fecha,FechaInicio,
        FechaFin
     } = req.body;
    try {
        const pool = await getConnection();
        const request = pool.request();
        request.input('IdProgramacionCapacitacion', sql.Int, id);
        request.input('Frecuencia', sql.VarChar, Frecuencia);
        request.input('Fecha', sql.Date, Fecha);
        request.input('FechaInicio', sql.Date, FechaInicio);
        request.input('FechaFin', sql.Date, FechaFin);
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('stp_programacioncapacitacion_update_fecha');
        //const result = await request.execute('stp_prueba_add');
        res.status(201).json({ message: "Actualizado con exito" });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el Catalogo: ' + err.message });
    }
});









// Añadir más rutas para crear, actualizar y eliminar departamentos

module.exports = router;