const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

    const login = async (email, senha) => {
        const usuario = await Usuarioo.scope('comSenha').findOne({ where: { email } });

        if (!usuario) {
          throw new Error('Credenciais Inválidas');
        }
    
    const confere = await bcrypt.compare(senha, usuario.senha);

    if (!confere) {
        throw new Error('Credenciais Inválidas');
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, usuario: { id: usuario.id, nome: usuario.nome, email:usuario.email } };

};

module.exports = { login };