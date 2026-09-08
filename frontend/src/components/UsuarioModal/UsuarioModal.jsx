import { useState, useEffect } from 'react';
import './UsuarioModal.css';

function UsuarioModal({ aberto, aoFechar, aoSalvar, usuarioEditando }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (usuarioEditando) {
            setNome(usuarioEditando.nome);
            setEmail(usuarioEditando.email);
            setSenha('');
        } else {
            setNome('');
            setEmail('');
            setSenha('');
        }
    }, [usuarioEditando]);    

    if (!aberto) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dados = { nome, email };

        if (senha) {
            dados.senha = senha;
        }

        aoSalvar(dados);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder={usuarioEditando ? 'Nova senha (opcional)' : 'Senha'}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required={!usuarioEditando}
                    />
                    <div className="modal-actions">
                        <button type="button" onClick={aoFechar}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UsuarioModal;