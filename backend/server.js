const express = require('express');
const cors = require('cors');
const cepRoutes = require('./routes/cepRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/mensagem', (req, res) => {
    res.json({ texto: "Ola do servidor!" });
});

app.use('/api',cepRoutes);

app.listen(3001);