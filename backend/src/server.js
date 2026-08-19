const express = require('express');
const cors = require('cors');
const cepRoutes = require('../src/routes/cepRoutes');
const app = express();
const PORT = 3000;
const router = require('../src/routes/routes')

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/api/mensagem', (req, res) => {
    res.json({ texto: "Ola do servidor!" });
});

app.use('/api',cepRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
