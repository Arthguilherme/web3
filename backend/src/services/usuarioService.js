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

module.exports = { 
   obterTodosUsuarios, 
   obterUsuarioPorId,
   criarUsuario
};