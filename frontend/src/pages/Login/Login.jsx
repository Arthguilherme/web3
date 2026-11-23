import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { entrar, entrarComGoogle ,carregando, erro } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deuCerto = await entrar(email, senha);
        if(deuCerto) {
            navigate('/Biblioteca');
        }
    };

    const handleGoogle = async (resposta) => {
        const deuCerto = await entrarComGoogle(resposta.credential);
        if (deuCerto) {
            navigate('/Biblioteca');
        }
    };

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>

            <input type="email" placeholder="Email" required
                value={email}
                onChange= {(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="senha" required
                value={senha}
                onChange={ (e) => setSenha(e.target.value)} />

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <button type="submit" disabled={carregando}>
                {carregando ? 'Entrando...' : 'Entrar'}
            </button>
        </form>

         <p>ou</p>

            <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => console.log('Falha no login com Google')}
            />
        </div>
    ); 
}

export default Login;