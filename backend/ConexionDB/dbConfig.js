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

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};
