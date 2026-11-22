const buscarLivros = async (termo) => {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i`;

    let resposta;
    try {
        resposta = await fetch(url, {
            headers: { 'User-Agent': 'Web3-Biblioteca/1.0 (projeto academico IFPR)' },
            signal: AbortSignal.timeout(10000),
        });
    } catch (err) {
        throw new Error('API_LIVROS_INDISPONIVEL');
    }

    if (!resposta.ok) {
        throw new Error('API_LIVROS_INDISPONIVEL');
    }

    const dados = await resposta.json();

    return (dados.docs || [])
        .filter((livro) => livro.key && livro.title)
        .map((livro) => ({
            ol_key: String(livro.key).replace('/works/', ''),
            titulo: livro.title,
            autor: livro.author_name ? livro.author_name.slice(0, 3).join(', ') : null,
            ano_publicacao: livro.first_publish_year || null,
            capa_url: livro.cover_i
                ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
                : null,
        }));
};

module.exports = { buscarLivros };