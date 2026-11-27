import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { entrar, entrarComGoogle, carregando, erro } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deuCerto = await entrar(email, senha);
        if (deuCerto) {
            navigate('/');
        }
    };

    const handleGoogle = async (resposta) => {
        const deuCerto = await entrarComGoogle(resposta.credential);
        if (deuCerto) {
            navigate('/');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand">
                    <BookOpen size={28} color="var(--primary-color)" />
                    <span>Biblioteca</span>
                </div>
                <p className="login-subtitle">Entre para acessar a sua estante</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {erro && <p className="login-erro">{erro}</p>}

                    <button type="submit" disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="login-divider"><span>ou</span></div>

                <div className="login-google">
                    <GoogleLogin
                        onSuccess={handleGoogle}
                        onError={() => console.log('Falha no login com Google')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;