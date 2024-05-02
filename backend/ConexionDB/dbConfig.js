//aplicacion que va ser que funcione importar expreess
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const sql = require('mssql');

const config = {
    user: 'UsuarioFamo',
    password: 'Famo2024',
    server: 'ACER-TM3109', // Puedes usar una dirección IP o nombre del servidor
    database: 'EmpleadosDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
  try {
      await sql.connect(config);
      console.log('Conectado a la base de datos SQL Server');
      return sql;
  } catch (err) {
      console.error('Error al conectar a la base de datos:', err);
      throw err;
  }
}

module.exports = getConnection;
/*
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};*/


