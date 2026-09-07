const usuarioService = require('../services/usuarioService');

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({ data: usuarios });
    
    } catch(err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuários'});

    }
};

const criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.criarUsuario(req.body);
        res.status(201).json({ data: novoUsuario });

    } catch (err) {
        res.status(500).json({ err: 'Erro interno ao criar usuário' });
    }
};

module.exports = { buscarUsuarios, criarUsuario }