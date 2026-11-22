import api from './api';

export const buscarLivros = async (q) => {
    const response = await api.get('/livros/buscar', { params: { q } });
    return response.data.data;
};

export const listarLivros = async (status) => {
    const response = await api.get('/livros', { params: status ? { status } : {} });
    return response.data.data;
};

export const adicionarLivro = async (livro) => {
    const response = await api.post('/livros', livro);
    return response.data.data;
};

export const atualizarLivro = async (id, dados) => {
    const response = await api.put(`/livros/${id}`, dados);
    return response.data.data;
};

export const removerLivro = async (id) => {
    const response = await api.delete(`/livros/${id}`);
    return response.data.data;
};