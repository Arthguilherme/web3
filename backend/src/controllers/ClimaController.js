const climaService = require('../services/climaService');

const atualizarClima = async (req, res) => {
    try {
        const { id } = req.params;
        const { cidade } = req.body;

        if (!cidade || cidade.trim().length < 2) {
            return res.status(400).json({ err: 'Informe a cidade (mínimo 2 caracteres).' });
        }

        const clima = await climaService.atualizarClimaDoUsuario(id, cidade.trim());
        res.status(200).json({ data: clima });

    } catch (err) {
        if (err.message === 'USUARIO_NAO_ENCONTRADO') {
            return res.status(404).json({ err: 'Usuário não encontrado' });
        }
        if (err.message === 'CIDADE_NAO_ENCONTRADA') {
            return res.status(404).json({ err: 'Cidade não encontrada' });
        }
        if (err.message === 'API_CLIMA_INDISPONIVEL') {
            return res.status(502).json({ err: 'Serviço de clima indisponível no momento' });
        }

        console.log(err);
        res.status(500).json({ err: 'Erro interno ao atualizar clima' });
    }
};

const buscarClima = async (req, res) => {
    try {
        const { id } = req.params;
        const clima = await climaService.obterClimaDoUsuario(id);

        if (!clima) {
            return res.status(404).json({ err: 'Nenhum clima salvo para este usuário' });
        }

        res.status(200).json({ data: clima });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Erro interno ao buscar clima' });
    }
};

module.exports = { atualizarClima, buscarClima };