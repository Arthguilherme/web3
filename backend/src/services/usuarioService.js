const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const obterTodosUsuarios = async () => {
   return await Usuario.findAll ();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async (dados) => {
    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
    
    const novoUsuario = await Usuario.create({
        ...dados,
        senha: senhaCriptografada
    });

    return novoUsuario;
};

const excluirUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return null;
    }

    await usuario.destroy();
    return usuario;
};

const editarUsuario = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return null;
    }

    await usuario.update(dados);
    return usuario;
};

module.exports = { 
   obterTodosUsuarios, 
   obterUsuarioPorId,
   criarUsuario,
   excluirUsuario,
   editarUsuario
};