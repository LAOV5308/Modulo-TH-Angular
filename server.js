const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'FamoDB',
    password: 'toor1234'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con MySQL');
});


//OBTNER TODOS LOS EMPLEADOS
app.get('/user', (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al realizar la consulta');
            return;
        }
        //res.json(results);
        res.send({
            message: 'data',
            empleados: results
        });
    });
});

//OBTNER SOLO POR ID
/*
app.get('/user/:id', (req, res) => {
    let gID = req.params.id;

    db.query('SELECT * FROM empleados where empleadoID = '+gID, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al realizar la consulta');
            return;
        }
        res.json(results);
    });
});
*/

//Obtener por ID 2
app.get('/user/:id', (req, res) =>  {
    let gID = req.params.id;

    let qr = "select * from empleados where empleadoID = " + gID;

    db.query(qr,(err,result)=> {
        if(err){console.log(err);}

        if(result.length>0){
            res.send({
                message: 'get single data',
                data: result
            });
        }
        else{
            res.send({
                message:"data not found"
            });

        }
    })

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
