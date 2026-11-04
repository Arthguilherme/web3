const authService = require('../services/authService');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resultado = await authService.login(email, senha);

        res.status(200).json({ data: resultado });

    } catch (err) {
        if (err.message === 'CREDENCIAIS_INVALIDAS') {
            return res.status(401).json({ err: 'Email ou senha inválidos' });
        }

        console.log(err);
        res.status(500).json({ err: 'Erro interno ao fazer login' });
    }
};

const loginGoogle = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ error: 'Credential não enviado' });
        }

        const dados = await authService.loginGoogle(credential);
        return res.status(200).json(dados);

    } catch (error) {
        return res.status(401).json({ error: 'Falha na autenticação com o Google' });
    }
};



module.exports = { login };