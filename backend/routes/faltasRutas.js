const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');


//Obtener las Faltas
router.get('/abiertos', async (req, res) => {
    // const { id } = req.params;
     try {
         const sql = await db.getConnection();
         const result = await sql.query('SELECT * FROM V_FaltasEmpleadosAbierto order by FechaFalta');
         res.json(result.recordset);
     } catch (err) {
         res.status(500).send('Error');
     }
 });
 
 router.get('/cerrados', async (req, res) => {
     // const { id } = req.params;
      try {
          const sql = await db.getConnection();
          const result = await sql.query('SELECT * FROM V_FaltasEmpleadosCerrada order by FechaFalta');
          res.json(result.recordset);
      } catch (err) {
          res.status(500).send('Error');
      }
  });
 
 router.get('/fechaspagar/:id', async (req, res) => {
      const { id } = req.params;
      try {
          const sql = await db.getConnection();
          const result = await sql.query('select * from tblFechasPagar where EstadoFechaPagar = 1 and IdFalta = '+id);
          res.json(result.recordset);
      } catch (err) {
          res.status(500).send('Error');
      }
  });
 
 //Obtener una Falta
 router.get('/:id', async (req, res) => {
      const { id } = req.params;
      try {
          const sql = await db.getConnection();
          const result = await sql.query('Select * from V_FaltasEmpleadosAbierto where IdFalta = '+id);
          res.json(result.recordset);
      } catch (err) {
          res.status(500).send('Error');
      }
  });
 
  //Borarr falta
 router.delete('/:id', async (req, res) => {
     const { id } = req.params;
     try {
         const pool = await db.getConnection();
         const request = pool.request();
         request.input('IdFalta', sql.Int, id);
         const result = await request.execute('stp_falta_delete');
         res.status(201).json({ message: "Falta eliminada con éxito" });
     } catch (err) {
         res.status(500).send('Error');
     }
 });
 
 
  //Borarr falta
  router.delete('/fechapagar/:id', async (req, res) => {
     const { id } = req.params;
     try {
         const pool = await db.getConnection();
         const request = pool.request();
         request.input('IdFechaPagar', sql.Int, id);
         const result = await request.execute('stp_faltaPagar_delete');
         res.status(201).json({ message: "Falta eliminada con éxito" });
     } catch (err) {
         res.status(500).send('Error');
     }
 });
  
 
 
 //Agregar Falta
  router.post('/', async (req, res) => {
     const { NoNomina, FechaFalta, Motivo, Sancion, Estatus, NivelSancion, HorasExtras, Comentario,EstadoFalta } = req.body;
     try {
         const pool = await db.getConnection();
         const request = pool.request();
         request.input('NoNomina', sql.Int, NoNomina);
         request.input('FechaFalta', sql.Date, FechaFalta);
         request.input('Motivo', sql.VarChar, Motivo);
         request.input('Sancion', sql.VarChar, Sancion);
         request.input('Estatus', sql.VarChar, Estatus);
         request.input('NivelSancion', sql.VarChar, NivelSancion);
         request.input('HorasExtras', sql.Bit, HorasExtras);
         request.input('Comentario', sql.VarChar, Comentario);
         request.input('EstadoFalta', sql.Bit, EstadoFalta);
         const result = await request.execute('stp_falta_add');
         res.status(201).json({ message: "Falta creada con éxito" });
     } catch (err) {
         res.status(500).json({ message: 'Error: ' + err.message });
     }
 });
 
 
 
 
 //Agregar Fecha Falta
 router.post('/fechaspagar', async (req, res) => {
     const {IdFalta, FechaPagar, Comentario } = req.body;
     try {
         const pool = await db.getConnection();
         const request = pool.request();
         request.input('IdFalta', sql.Int, IdFalta);
         request.input('FechaPagar', sql.Date, FechaPagar);
         request.input('Comentario', sql.VarChar, Comentario);
         const result = await request.execute('stp_fechapagar_add');
         res.status(201).json({ message: "Fecha creada con éxito" });
     } catch (err) {
         res.status(500).json({ message: 'Error: ' + err.message });
     }
 });
 
 
 router.post('/faltacerrar', async (req, res) => {
     const {IdFalta } = req.body;
     try {
         const pool = await db.getConnection();
         const request = pool.request();
         request.input('IdFalta', sql.Int, IdFalta);
         const result = await request.execute('stp_fechapagar_close');
         res.status(201).json({ message: "Falta cerrada con éxito" });
     } catch (err) {
         res.status(500).json({ message: 'Error: ' + err.message });
     }
 });
 
 
 
 
 module.exports = router;