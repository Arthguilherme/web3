import { useState } from 'react';
import { useState } from 'react';
import './UsuarioModal.css';

function UsuarioModal({ aberto, aoFechar, aoSalvar }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    if (!aberto) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        aoSalvar({ nome, email, senha });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Novo Usuário</h2>
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
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
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