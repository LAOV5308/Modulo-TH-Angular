const sql = require('mssql');

const poolPromise = new sql.ConnectionPool({
    user: 'UsuarioFamo',
    password: 'Famo2024',
    server: 'ACER-TM3109',
    database: 'EmpleadosDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}).connect();

poolPromise.then(pool => {
    console.log('Conectado a SQL Server');
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

module.exports = {
    sql, 
    getConnection: () => poolPromise
};


//aplicacion que va ser que funcione importar expreess
/*const express = require('express');
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
*/

