import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, deleteUsuario, getUsuario, updateUsuario } from '../../../services/usuarioServices';
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
                        <li key={user.id} style={styles.userCard}>
                            <div style={styles.userInfo}>
                                <span style={styles.userName}>{user.nome}</span>
                                <span style={styles.userEmail}>{user.email}</span>
                            </div>
                            <div style={styles.statusBadge}>ID #{user.id}</div>
                            <button onClick={() => { setUsuarioEditando(user); setModalAberto(true); }}>Editar</button>
                            <button onClick={() => handleExcluir(user.id)}>Excluir</button>
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
