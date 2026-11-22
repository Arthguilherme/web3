const Livro = require('../models/Livro');

const CAMPOS_NOVO_LIVRO = ['ol_key', 'titulo', 'autor', 'ano_publicacao', 'capa_url', 'status'];

const listarLivros = async (usuarioId, status) => {
    const where = { usuario_id: usuarioId };
    if (status) {
        where.status = status;
    }
    return await Livro.findAll({ where, order: [['createdAt', 'DESC']] });
};

const adicionarLivro = async (usuarioId, dados) => {
    const novo = { usuario_id: usuarioId };

    CAMPOS_NOVO_LIVRO.forEach((campo) => {
        if (dados[campo] !== undefined) {
            novo[campo] = dados[campo];
        }
    });

    try {
        return await Livro.create(novo);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            throw new Error('LIVRO_JA_NA_LISTA');
        }
        throw err;
    }
};

const atualizarLivro = async (usuarioId, id, dados) => {
    const livro = await Livro.findOne({ where: { id, usuario_id: usuarioId } });
    if (!livro) {
        return null;
    }

    const alteracoes = {};
    if (dados.status !== undefined) alteracoes.status = dados.status;
    if (dados.nota !== undefined) alteracoes.nota = dados.nota;

    await livro.update(alteracoes);
    return livro;
};

const removerLivro = async (usuarioId, id) => {
    const livro = await Livro.findOne({ where: { id, usuario_id: usuarioId } });
    if (!livro) {
        return null;
    }

    await livro.destroy();
    return livro;
};

module.exports = { listarLivros, adicionarLivro, atualizarLivro, removerLivro };