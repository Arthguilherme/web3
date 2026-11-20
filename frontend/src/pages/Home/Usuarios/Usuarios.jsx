import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, deleteUsuario, getUsuario, updateUsuario, atualizarClima, getClima } from '../../../services/usuarioServices';
import UsuarioModal from '../../../components/UsuarioModal/UsuarioModal';

const styles = {
    usersList: {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
    },
    userCard: {
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    userName: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '4px',
    },
    userEmail: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
    },
    statusBadge: {
        background: 'var(--badge-bg)',
        color: 'var(--primary-color)',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
    },
    message: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        margin: '2rem 0',
        fontSize: '1.2rem',
    },
    userRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
    },
    climaPainel: {
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    climaDados: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '12px',
        flexWrap: 'wrap',
        color: 'var(--text-primary)',
    },
    climaTemperatura: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--primary-color)',
    },
    climaErro: {
        color: '#dc2626',
        fontSize: '0.9rem',
    },
};

function Usuarios() {
    const [users, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [buscaId, setBuscaId] = useState('');
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const [erroBusca, setErroBusca] = useState(null);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [climaAberto, setClimaAberto] = useState(null);
    const [clima, setClima] = useState(null);
    const [cidadeClima, setCidadeClima] = useState('');
    const [erroClima, setErroClima] = useState(null);
    const [carregandoClima, setCarregandoClima] = useState(false);

    const handleSalvarUsuario = async (dadosUsuario) => {
        try {
            if (usuarioEditando) {
                await updateUsuario(usuarioEditando.id, dadosUsuario);
            } else {
                await createUsuario(dadosUsuario);
            }

            const data = await getUsuarios();
            setUsuarios(data.data || []);
            setModalAberto(false);
            setUsuarioEditando(null);
        } catch (error) {
            setError(error.response?.data?.err || error.message || 'Erro ao salvar usuário');
        }
    };

    const handleExcluir = async (id) => {
        try {
            await deleteUsuario(id);
            const data = await getUsuarios();
            setUsuarios(data.data || []);
        } catch (error) {
            setError(error.response?.data?.err || error.message || 'Erro ao excluir usuário');
        }
    };

    const handleBuscarPorId = async (e) => {
        e.preventDefault();
        setErroBusca(null);
        setUsuarioBuscado(null);

        try {
            const data = await getUsuario(buscaId);
            setUsuarioBuscado(data.data);
        } catch (error) {
            setErroBusca(error.response?.data?.err || error.message || 'Usuário não encontrado');
        }
    };

    const handleAbrirClima = async (user) => {
        if (climaAberto === user.id) {
            setClimaAberto(null);
            return;
        }

        setClimaAberto(user.id);
        setClima(null);
        setErroClima(null);
        setCidadeClima('');

        try {
            const data = await getClima(user.id);
            setClima(data.data);
            setCidadeClima(data.data.cidade);
        } catch (error) {
            if (error.response?.status !== 404) {
                setErroClima(error.response?.data?.err || error.message || 'Erro ao buscar clima');
            }
        }
    };

    const handleAtualizarClima = async (e) => {
        e.preventDefault();
        setErroClima(null);
        setCarregandoClima(true);

        try {
            const data = await atualizarClima(climaAberto, cidadeClima);
            setClima(data.data);
        } catch (error) {
            setErroClima(error.response?.data?.err || error.message || 'Erro ao atualizar clima');
        } finally {
            setCarregandoClima(false);
        }
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data.data || []);
            } catch (error) {
                setError(error.response?.data?.err || error.message || 'Erro ao buscar usuários');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);
    return (
        <div className="page-container">
            <h1>Lista de Usuários</h1>
            <button onClick={() => { setUsuarioEditando(null); setModalAberto(true); }}>Novo Usuário</button>
            <form onSubmit={handleBuscarPorId} style={{ display: 'flex', gap: '8px', margin: '1rem 0' }}>
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={buscaId}
                    onChange={(e) => setBuscaId(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            {erroBusca && <div style={styles.message}>Ops! {erroBusca}</div>}

            {usuarioBuscado && (
                <li style={{ ...styles.userCard, listStyleType: 'none', marginBottom: '1rem' }}>
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>{usuarioBuscado.nome}</span>
                        <span style={styles.userEmail}>{usuarioBuscado.email}</span>
                    </div>
                    <div style={styles.statusBadge}>ID #{usuarioBuscado.id}</div>
                </li>
            )}
            {loading && <div style={styles.message}>Carregando usuários...</div>}

            {error && <div style={styles.message}>Ops! {error}</div>}

            {!loading && !error && users.length === 0 && (
                <div style={styles.message}>Nenhum usuário encontrado no momento.</div>
            )}

            {!loading && !error && users.length > 0 && (
                <ul style={styles.usersList}>
                    {users.map(user => (
                        <li key={user.id} style={{ ...styles.userCard, flexDirection: 'column', alignItems: 'stretch' }}>
                            <div style={styles.userRow}>
                                <div style={styles.userInfo}>
                                    <span style={styles.userName}>{user.nome}</span>
                                    <span style={styles.userEmail}>{user.email}</span>
                                </div>
                                <div style={styles.statusBadge}>ID #{user.id}</div>
                                <button onClick={() => { setUsuarioEditando(user); setModalAberto(true); }}>Editar</button>
                                <button onClick={() => handleExcluir(user.id)}>Excluir</button>
                                <button onClick={() => handleAbrirClima(user)}>Clima</button>
                            </div>

                            {climaAberto === user.id && (
                                <div style={styles.climaPainel}>
                                    <form onSubmit={handleAtualizarClima} style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            placeholder="Cidade (ex: Paranaguá)"
                                            value={cidadeClima}
                                            onChange={(e) => setCidadeClima(e.target.value)}
                                            required
                                        />
                                        <button type="submit" disabled={carregandoClima}>
                                            {carregandoClima ? 'Consultando...' : 'Atualizar'}
                                        </button>
                                    </form>

                                    {erroClima && <div style={styles.climaErro}>{erroClima}</div>}

                                    {clima && (
                                        <div style={styles.climaDados}>
                                            <span style={styles.climaTemperatura}>{Number(clima.temperatura).toFixed(1)}°C</span>
                                            <span>{clima.condicao_clima}</span>
                                            <span style={styles.userEmail}>
                                                {clima.cidade} · atualizado em {new Date(clima.consultado_em).toLocaleString('pt-BR')}
                                            </span>
                                        </div>
                                    )}

                                    {!clima && !erroClima && (
                                        <span style={styles.userEmail}>Nenhum clima salvo. Digite a cidade e clique em Atualizar.</span>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <UsuarioModal
                aberto={modalAberto}
                aoFechar={() => { setModalAberto(false); setUsuarioEditando(null); }}
                aoSalvar={handleSalvarUsuario}
                usuarioEditando={usuarioEditando}
            />
        </div>
    );

}
export default Usuarios;
