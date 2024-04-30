const express = require('express');
const app = express();
const apiRouter = require('./backend/ConexionDB/api');


app.use(express.json());

app.use('/', apiRouter);  // Usa las rutas definidas en api.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
