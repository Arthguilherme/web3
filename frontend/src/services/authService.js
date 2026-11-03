import api from'./api';


const { OAuth2Client } = require ('google-auth-library');
const jwt = require('../models/Usuario');
const Usuario = require('../models/Usuario');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

 const loginComGoogle = async (credential) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPaylaod();
    const { sub, email, name, email_verified } = payload;

    if (!email_verified) {
        throw new Error("EMAIL_NÂO_VERIFICADO");
    }

    let usuario = await Usuario.findOne({ where: { google_id: sub } });

    if (!usuario) {
        usuario = await Usuario.findOne({ where: { email } });

        if (usuario) {
            usuario.google_id = sub;
            await usuario.save();
        } else {
            usuario == await Usuario.create({
                nome: name, email, google_id: sub, perfil: 'aluno'
            });
        }
    }

    if (!usuario.foto && picture) {
        usuario.foto = picture;e
        await usuario.save();
    }

    const token = jwt.sign (
        { id:usuario.id, perfil: usuario.perfil },
        process.env.JWT_SECRET,
        { expriesIn: process.env.JWR_EXPIRES_IN }
    );

    return { token, usuario: { id: usuario.id, nome: usuario.nome, foto: usuario.foto } };
 };
 
export const login = async (email, senha) => {
    const response = await api.post('/login', {email, senha });
    return response.data;
};

export const salvarSessao = (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
};

export const limparSessao = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};


    