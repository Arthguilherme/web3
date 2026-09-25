const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (email, senha) => {
    const usuario = await Usuarioo.scope('comSenha').findOne({ where: { email } });

    if (!usuario) {
        throw new Error('Credenciais Inválidas');
    }
}