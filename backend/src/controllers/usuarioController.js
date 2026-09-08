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

const excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioExcluido = await usuarioService.excluirUsuario(id);

        if (!usuarioExcluido) {
            return res.status(404).json({ err: 'Usuário não encontrado' });
        }

        res.status(200).json({ data: usuarioExcluido });

    } catch (err) {
        res.status(500).json({ err: 'Erro interno ao excluir usuário' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obterUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ err: 'Usuário não encontrado' });
        }

        res.status(200).json({ data: usuario });

    } catch (err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuário' });
    }
};

module.exports = { 
    buscarUsuarios, 
    criarUsuario, 
    excluirUsuario,
    buscarUsuarioPorId 
}