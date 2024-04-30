const express = require('express');
const router = express.Router();
const { poolPromise } = require('./dbConfig');

router.get('/datos', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM tblEmpleado');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los datos' });
    }
});

//Obtener por ID 2
router.get('/datos/:id', async (req, res) =>  {
    try {
        let gID = req.params.id;
        let qr = "select * from tblEmpleado where NumeroNomina = " + gID;
        const pool = await poolPromise;
        const result = await pool.request().query(qr);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los datos' });
    }

});

module.exports = router;
