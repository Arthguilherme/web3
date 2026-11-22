import { useState, useEffect } from 'react';
import {
    buscarLivros,
    listarLivros,
    adicionarLivro,
    atualizarLivro,
    removerLivro,
} from '../../services/livroServices';

const styles = {
    secao: {
        marginTop: '2rem',
    },
    formBusca: {
        display: 'flex',
        gap: '8px',
        margin: '1rem 0',
    },
    grade: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '12px',
    },
    card: {
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        gap: '12px',
    },
    capa: {
        width: '64px',
        height: '96px',
        objectFit: 'cover',
        borderRadius: '6px',
        flexShrink: 0,
    },
    semCapa: {
        width: '64px',
        height: '96px',
        borderRadius: '6px',
        flexShrink: 0,
        background: 'var(--badge-bg)',
        color: 'var(--text-secondary)',
        fontSize: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        minWidth: 0,
    },
    titulo: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
    },
    detalhe: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
    },
    acoes: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginTop: '6px',
    },
    mensagem: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        margin: '1rem 0',
    },
    erro: {
        color: '#dc2626',
        margin: '1rem 0',
    },
    creditos: {
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
    },
};

const ROTULOS_STATUS = {
    quero_ler: 'Quero ler',
    lendo: 'Lendo',
    lido: 'Lido',
};

function Capa({ url, titulo }) {
    if (!url) {
        return <div style={styles.semCapa}>Sem capa</div>;
    }
    return <img src={url} alt={`Capa de ${titulo}`} style={styles.capa} />;
}

function Biblioteca() {
    const [termo, setTermo] = useState('');
    const [resultados, setResultados] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [jaBuscou, setJaBuscou] = useState(false);
    const [erroBusca, setErroBusca] = useState(null);

    const [minhaLista, setMinhaLista] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState('');
    const [erroLista, setErroLista] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    const carregarLista = async () => {
        try {
            const dados = await listarLivros(filtroStatus);
            setMinhaLista(dados);
            setErroLista(null);
        } catch (error) {
            setErroLista(error.response?.data?.err || error.message || 'Erro ao carregar sua biblioteca');
        }
    };

    useEffect(() => {
        carregarLista();
    }, [filtroStatus]);

    const handleBuscar = async (e) => {
        e.preventDefault();
        setErroBusca(null);
        setBuscando(true);
        setJaBuscou(true);

        try {
            const dados = await buscarLivros(termo);
            setResultados(dados);
        } catch (error) {
            setResultados([]);
            setErroBusca(error.response?.data?.err || error.message || 'Erro ao buscar livros');
        } finally {
            setBuscando(false);
        }
    };

    const handleAdicionar = async (livro) => {
        setMensagem(null);

        try {
            await adicionarLivro(livro);
            setMensagem(`"${livro.titulo}" foi adicionado à sua biblioteca.`);
            await carregarLista();
        } catch (error) {
            setMensagem(error.response?.data?.err || error.message || 'Erro ao adicionar livro');
        }
    };

    const handleAtualizar = async (id, dados) => {
        try {
            await atualizarLivro(id, dados);
            await carregarLista();
        } catch (error) {
            setErroLista(error.response?.data?.err || error.message || 'Erro ao atualizar livro');
        }
    };

    const handleRemover = async (id) => {
        try {
            await removerLivro(id);
            await carregarLista();
        } catch (error) {
            setErroLista(error.response?.data?.err || error.message || 'Erro ao remover livro');
        }
    };

    return (
        <div className="page-container">
            <h1>Biblioteca</h1>

            <form onSubmit={handleBuscar} style={styles.formBusca}>
                <input
                    type="text"
                    placeholder="Buscar livro por título ou autor"
                    value={termo}
                    onChange={(e) => setTermo(e.target.value)}
                    required
                    minLength={2}
                />
                <button type="submit" disabled={buscando}>
                    {buscando ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {mensagem && <div style={styles.mensagem}>{mensagem}</div>}
            {erroBusca && <div style={styles.erro}>{erroBusca}</div>}

            {jaBuscou && !buscando && !erroBusca && resultados.length === 0 && (
                <div style={styles.mensagem}>Nenhum livro encontrado.</div>
            )}

            {resultados.length > 0 && (
                <div style={styles.grade}>
                    {resultados.map((livro) => (
                        <div key={livro.ol_key} style={styles.card}>
                            <Capa url={livro.capa_url} titulo={livro.titulo} />
                            <div style={styles.info}>
                                <span style={styles.titulo}>{livro.titulo}</span>
                                <span style={styles.detalhe}>{livro.autor || 'Autor desconhecido'}</span>
                                {livro.ano_publicacao && (
                                    <span style={styles.detalhe}>{livro.ano_publicacao}</span>
                                )}
                                <div style={styles.acoes}>
                                    <button onClick={() => handleAdicionar(livro)}>Adicionar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.secao}>
                <h2>Minha biblioteca</h2>

                <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="quero_ler">Quero ler</option>
                    <option value="lendo">Lendo</option>
                    <option value="lido">Lido</option>
                </select>

                {erroLista && <div style={styles.erro}>{erroLista}</div>}

                {!erroLista && minhaLista.length === 0 && (
                    <div style={styles.mensagem}>
                        {filtroStatus
                            ? 'Nenhum livro com esse status.'
                            : 'Sua biblioteca está vazia. Busque um livro acima e adicione.'}
                    </div>
                )}

                {minhaLista.length > 0 && (
                    <div style={{ ...styles.grade, marginTop: '1rem' }}>
                        {minhaLista.map((livro) => (
                            <div key={livro.id} style={styles.card}>
                                <Capa url={livro.capa_url} titulo={livro.titulo} />
                                <div style={styles.info}>
                                    <span style={styles.titulo}>{livro.titulo}</span>
                                    <span style={styles.detalhe}>{livro.autor || 'Autor desconhecido'}</span>
                                    {livro.ano_publicacao && (
                                        <span style={styles.detalhe}>{livro.ano_publicacao}</span>
                                    )}
                                    <div style={styles.acoes}>
                                        <select
                                            value={livro.status}
                                            onChange={(e) => handleAtualizar(livro.id, { status: e.target.value })}
                                        >
                                            {Object.entries(ROTULOS_STATUS).map(([valor, rotulo]) => (
                                                <option key={valor} value={valor}>{rotulo}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={livro.nota ?? ''}
                                            onChange={(e) =>
                                                handleAtualizar(livro.id, {
                                                    nota: e.target.value === '' ? null : Number(e.target.value),
                                                })
                                            }
                                        >
                                            <option value="">Sem nota</option>
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <option key={n} value={n}>{n} ★</option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleRemover(livro.id)}>Remover</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={styles.creditos}>
                Dados e capas: <a href="https://openlibrary.org" target="_blank" rel="noreferrer">Open Library</a>
            </div>
        </div>
    );
}

export default Biblioteca;