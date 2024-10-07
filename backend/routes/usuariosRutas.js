const express = require('express');
const router = express.Router();
const db = require('../ConexionDB/dbConfig');// Asumiendo que dbConfig.js exporta una función para obtener el pool de conexiones
const {sql, getConnection} = require('../ConexionDB/dbConfig');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'your_secret_key'; // Cambia esto por tu clave secreta

// Registro de usuario
router.post('/register', async (req, res) => {

    const { NombreUsuario, IdRole, Password, FechaCreacion } = req.body;

    try {
     
        const pool = await getConnection();
        await pool.request()
            .input('NombreUsuario', sql.VarChar, NombreUsuario)
            .input('IdRole', sql.Int, IdRole)
            .input('Password', sql.VarChar, Password)
            .input('FechaCreacion', sql.Date, FechaCreacion)
            .execute('stp_usuario_add');

            res.status(201).json({ message: "Usuario Registrado Con exito" });

    } catch (err) {
        res.status(500).json({error:'Error al registrar el usuario: ' + err.message});
    }
});

// Obtener usuarios
router.get('/roles', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('select * from tblRoles where EstadoRole = 1');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener a los Roles: ' + err.message);
    }
});


// Obtener usuarios
router.get('/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().query('select * from tblRoles where EstadoRole = 1 and IdRole = '+id
        );
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener a los Roles: ' + err.message);
    }
});


//Actualizar Role
router.put('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const {NombreRole, DescripcionRole} = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRole', sql.Int, id)
            .input('NombreRole', sql.VarChar, NombreRole)
            .input('DescripcionRole', sql.VarChar, DescripcionRole)
            .execute('stp_role_update');

            res.status(201).json({ message: "Role Actualizado Con exito" });
    } catch (err) {
        res.status(500).send('Error al actualizar el Role: ' + err.message);
    }
});


// Actualizar usuario Con Contraseña
router.put('/user/:id', async (req, res) => {
    const { id} = req.params;
    const { NombreUsuario, IdRole, Password} = req.body;

    try {
     
        const pool = await getConnection();
        await pool.request()
            .input('IdUsuario', sql.Int, id)
            .input('NombreUsuario', sql.VarChar, NombreUsuario)
            .input('IdRole', sql.Int, IdRole)
            .input('Password', sql.VarChar, Password)
            .execute('stp_usuario_update');

            res.status(201).json({ message: "Usuario Actualizado Con exito" });

    } catch (err) {
        res.status(500).json({error:'Error al actualizar el usuario: ' + err.message});
    }
});


// Actualizar usuario Sin Contraseña
router.put('/usersc/:id', async (req, res) => {
    const { id} = req.params;
    const { NombreUsuario, IdRole} = req.body;

    try {
     
        const pool = await getConnection();
        await pool.request()
            .input('IdUsuario', sql.Int, id)
            .input('NombreUsuario', sql.VarChar, NombreUsuario)
            .input('IdRole', sql.Int, IdRole)
            .execute('stp_usuario_updatesc');

            res.status(201).json({ message: "Usuario Actualizado Con exito" });

    } catch (err) {
        res.status(500).json({error:'Error al actualizar el usuario: ' + err.message});
    }
});




// Obtener usuarios
router.delete('/roles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdRole', sql.Int, id)
            .execute('stp_role_delete');

            res.status(201).json({ message: "Role Eliminado Con exito" });

    } catch (err) {
        res.status(500).json({error:'Error al eliminar el Role: ' + err.message});
    }
});


// Agregar Roles
router.post('/roles', async (req, res) => {
    const { NombreRole, DescripcionRole } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
            request.input('NombreRole', sql.VarChar, NombreRole)
            request.input('DescripcionRole', sql.VarChar, DescripcionRole)
            request.output('IdRole', sql.Int)
            const result = await request.execute('stp_role_add');
            
         // Obtener el valor de la salida (output)
         const IdRole = result.output.IdRole;
        //const result = await request.execute('stp_prueba_add');

        // Responder con el ID generado o existente
        res.status(201).json({ 
            message: "Agregado al Rol con éxito",
            IdRole
        });
            
    } catch (err) {
        res.status(500).json({error:'Error al registrar el rol: ' + err.message});
    }
});


router.post('/permisos', async (req, res) => {
    const { IdRole, NombreColumna } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();
            request.input('IdRole', sql.Int, IdRole)
            request.input('NombreColumna', sql.VarChar, NombreColumna)
            const result = await request.execute('stp_Roles_addPermisos');
            
        // Responder con el ID generado o existente
        res.status(201).json({ 
            message: "Agregado Los permisos con éxito"});
            
    } catch (err) {
        res.status(500).json({error:'Error al registrar Los permisos el rol: ' + err.message});
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('IdUsuario', sql.Int, id)
            .execute('stp_usuario_delete');

            res.status(201).json({ message: "Usuario Eliminado Con exito" });

    } catch (err) {
        res.status(500).json({error:'Error al registrar el usuario: ' + err.message});
    }
});


// Obtener usuarios
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('select * from V_UsuariosRoles where EstadoUsuario = 1');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener a los Usuarios: ' + err.message);
    }
});

// Obtener usuarios
router.get('/:id', async (req, res) => {
    const{id} = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request().query('select * from V_UsuariosRoles where EstadoUsuario=1 and IdUsuario= '+id);
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
            const nombreRole = result.recordset[0].NombreRole;
            const idUsuario = result.recordset[0].IdUsuario;
            ///Creo que aqui se puede tambien obtener el nombre
            const token = jwt.sign({ NombreUsuario, NombreRole: nombreRole, IdUsuario: idUsuario }, secretKey, { expiresIn: '1h' });
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