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

        const resultados = await authService.loginComGoogle(credential);
        return res.status(200).json({ data: resultados});

    } catch (err) {
        if (err.message === 'TOKEN_GOOGLE_INVALIDO') {
            return res.status(401).json({ err: 'Token do Google inválido' });
        }
        if (err.message === 'EMAIL_NAO_VERIFICADO') {
            return res.status(403).json({ err: 'E-mail da conta Google não verificado' });
        }

        console.log(err);
        res.status(500).json({ err: 'Erro interno ao fazer login com Google' });
    }
};

module.exports = { login, loginGoogle };