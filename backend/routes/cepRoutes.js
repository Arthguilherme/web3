const express = require('express');
const router = express.Router();

router.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            return res.status(404).json({
                erro: "CEP não encontrado!"
            });
        }

        res.status(200).json(dados);

    } catch (err) {
        res.status(500).json({
            erro: "Erro de comunicação com VIACEP"
        });
    }
});

router.get('/endereco/:uf/:cidade/:logradouro', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;

})

module.exports = router;