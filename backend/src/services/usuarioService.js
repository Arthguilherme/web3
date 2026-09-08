const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async () => {
   return await Usuario.findAll ();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async (dados) => {
    return await Usuario.create(dados);
};

const excluirUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return null;
    }

    await usuario.destroy();
    return usuario;
};

module.exports = { 
   obterTodosUsuarios, 
   obterUsuarioPorId,
   criarUsuario,
   excluirUsuario
};