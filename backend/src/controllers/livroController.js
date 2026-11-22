const openLibraryService = require('../services/openLibraryService');
const livroService = require('../services/livroService');

const STATUS_VALIDOS = ['quero_ler', 'lendo', 'lido'];

const dadosInvalidos = ({ status, nota }) => {
    if (status !== undefined && !STATUS_VALIDOS.includes(status)) {
        return 'Status inválido. Use quero_ler, lendo ou lido.';
    }
    if (nota !== undefined && nota !== null && (!Number.isInteger(nota) || nota < 1 || nota > 5)) {
        return 'A nota deve ser um número inteiro de 1 a 5.';
    }
    return null;
};

const buscar = async (req, res) => {
    try {
        const termo = (req.query.q || '').trim();

        if (termo.length < 2) {
            return res.status(400).json({ err: 'Informe o termo de busca (mínimo 2 caracteres).' });
        }

        const livros = await openLibraryService.buscarLivros(termo);
        res.status(200).json({ data: livros });

    } catch (err) {
        if (err.message === 'API_LIVROS_INDISPONIVEL') {
            return res.status(502).json({ err: 'Serviço de livros indisponível no momento' });
        }

        console.log(err);
        res.status(500).json({ err: 'Erro interno ao buscar livros' });
    }
};

const listar = async (req, res) => {
    try {
        const livros = await livroService.listarLivros(req.usuario.id, req.query.status);
        res.status(200).json({ data: livros });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Erro interno ao listar livros' });
    }
};

const adicionar = async (req, res) => {
    try {
        const { ol_key, titulo } = req.body;

        if (!ol_key || !titulo) {
            return res.status(400).json({ err: 'ol_key e titulo são obrigatórios.' });
        }

        const erro = dadosInvalidos(req.body);
        if (erro) {
            return res.status(400).json({ err: erro });
        }

        const livro = await livroService.adicionarLivro(req.usuario.id, req.body);
        res.status(201).json({ data: livro });

    } catch (err) {
        if (err.message === 'LIVRO_JA_NA_LISTA') {
            return res.status(409).json({ err: 'Este livro já está na sua lista' });
        }

        console.log(err);
        res.status(500).json({ err: 'Erro interno ao adicionar livro' });
    }
};

const atualizar = async (req, res) => {
    try {
        const erro = dadosInvalidos(req.body);
        if (erro) {
            return res.status(400).json({ err: erro });
        }

        const livro = await livroService.atualizarLivro(req.usuario.id, req.params.id, req.body);

        if (!livro) {
            return res.status(404).json({ err: 'Livro não encontrado na sua lista' });
        }

        res.status(200).json({ data: livro });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Erro interno ao atualizar livro' });
    }
};

const remover = async (req, res) => {
    try {
        const livro = await livroService.removerLivro(req.usuario.id, req.params.id);

        if (!livro) {
            return res.status(404).json({ err: 'Livro não encontrado na sua lista' });
        }

        res.status(200).json({ data: livro });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Erro interno ao remover livro' });
    }
};

module.exports = { buscar, listar, adicionar, atualizar, remover };