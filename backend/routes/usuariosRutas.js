const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'your_secret_key'; // Cambia esto por tu clave secreta

// Registro de usuario
router.post('/register', async (req, res) => {
    const { NombreUsuario, NombreRol, Password } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('NombreUsuario', sql.VarChar, NombreUsuario)
            .input('NombreRol', sql.VarChar, NombreRol)
            .input('Password', sql.VarChar, Password)
            .execute('stp_usuario_add');

        res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
        res.status(500).send('Error al registrar el usuario: ' + err.message);
    }
});

// Obtener usuarios
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM tblUsuarios');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener a los Usuarios: ' + err.message);
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { NombreUsuario, Password } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('NombreUsuario', sql.VarChar, NombreUsuario)
            .input('Password', sql.VarChar, Password)
            .output('IsMatch', sql.Bit)
            .execute('stp_usuario_VerifyPassword');

        const isMatch = result.output.IsMatch;

        if (isMatch) {
            const nombreRol = result.recordset[0].NombreRol;
            ///Creo que aqui se puede tambien obtener el nombre
            const token = jwt.sign({ NombreUsuario, NombreRol: nombreRol }, secretKey, { expiresIn: '1h' });
            //res.status(200).json({ nombreRol });
            res.status(200).json({ token });
        } else {
            res.status(200).send('Contraseña incorrecta');
        }
    } catch (err) {
        res.status(500).send('Error al iniciar sesión: ' + err.message);
    }
});



module.exports = router;