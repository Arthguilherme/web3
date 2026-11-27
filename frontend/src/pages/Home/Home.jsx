import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listarLivros } from '../../services/livroServices';
import './Home.css';

function Home() {
    const { usuario } = useAuth();
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregar = async () => {
            try {
                setLivros(await listarLivros());
            } catch (error) {
                setErro(error.response?.data?.err || error.message || 'Erro ao carregar a sua estante');
            } finally {
                setCarregando(false);
            }
        };

        carregar();
    }, []);

    const total = (status) => livros.filter((livro) => livro.status === status).length;
    const lendoAgora = livros.filter((livro) => livro.status === 'lendo').slice(0, 6);
    const primeiroNome = usuario?.nome?.split(' ')[0] || '';

    return (
        <div className="page-container">
            <h1>Olá{primeiroNome ? `, ${primeiroNome}` : ''}!</h1>
            <p className="home-subtitle">Veja como está a sua estante.</p>

            {erro && <p className="home-erro">{erro}</p>}

            <div className="home-stats">
                <div className="home-stat">
                    <span className="home-stat-numero">{carregando ? '–' : total('quero_ler')}</span>
                    <span className="home-stat-rotulo">Quero ler</span>
                </div>
                <div className="home-stat">
                    <span className="home-stat-numero">{carregando ? '–' : total('lendo')}</span>
                    <span className="home-stat-rotulo">Lendo</span>
                </div>
                <div className="home-stat">
                    <span className="home-stat-numero">{carregando ? '–' : total('lido')}</span>
                    <span className="home-stat-rotulo">Lidos</span>
                </div>
            </div>

            <h2>Lendo agora</h2>

            {!carregando && !erro && lendoAgora.length === 0 && (
                <p className="home-vazio">
                    Nenhum livro em leitura. <Link to="/biblioteca">Escolha o próximo na biblioteca</Link>.
                </p>
            )}

            {lendoAgora.length > 0 && (
                <div className="home-capas">
                    {lendoAgora.map((livro) => (
                        <div key={livro.id} className="home-livro">
                            {livro.capa_url ? (
                                <img src={livro.capa_url} alt={`Capa de ${livro.titulo}`} />
                            ) : (
                                <div className="home-sem-capa">Sem capa</div>
                            )}
                            <span title={livro.titulo}>{livro.titulo}</span>
                        </div>
                    ))}
                </div>
            )}

            <Link to="/biblioteca" className="home-botao">Ir para a biblioteca</Link>
        </div>
    );
}

export default Home;