const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const gerarToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

const login = async (email, senha) => {
    const usuario = await Usuario.scope('comSenha').findOne({ where: { email } });

    if (!usuario || !usuario.senha) {
        throw new Error('CREDENCIAIS_INVALIDAS');
    }

    const confere = await bcrypt.compare(senha, usuario.senha);

    if (!confere) {
        throw new Error('CREDENCIAIS_INVALIDAS');
    }

    return {
        token: gerarToken(usuario),
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    };
};

const loginComGoogle = async (credential) => {
    let payload;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
    } catch (err) {
        throw new Error('TOKEN_GOOGLE_INVALIDO');
    }

    const { sub, email, name, picture, email_verified } = payload;

    if (!email_verified) {
        throw new Error('EMAIL_NAO_VERIFICADO');
    }

    let usuario = await Usuario.findOne({ where: { google_id: sub } });

    if (!usuario) {
        usuario = await Usuario.findOne({ where: { email } });

        if (usuario) {
            usuario.google_id = sub;
            await usuario.save();
        } else {
            usuario = await Usuario.create({
                nome: name,
                email,
                google_id: sub,
                foto: picture,
            });
        }
    }

    return {
        token: gerarToken(usuario),
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, foto: usuario.foto },
    };
};

module.exports = { login, loginComGoogle };