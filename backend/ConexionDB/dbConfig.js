const sql = require('mssql');

const poolPromise = new sql.ConnectionPool({
    user: 'UsuarioFamo',
    password: 'Famo2024',
    //server: '192.168.11.11',
    //server: 'DESKTOP-LAOV530',
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

