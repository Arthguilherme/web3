const Usuario = require('../models/Usuario');
const ClimaUsuario = require('../models/ClimaUsuario');

const DESCRICOES = {
    0: 'Céu limpo',
    1: 'Predominantemente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro com geada',
    51: 'Garoa fraca',
    53: 'Garoa moderada',
    55: 'Garoa forte',
    61: 'Chuva fraca',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    71: 'Neve fraca',
    73: 'Neve moderada',
    75: 'Neve forte',
    80: 'Pancadas de chuva fracas',
    81: 'Pancadas de chuva moderadas',
    82: 'Pancadas de chuva fortes',
    95: 'Trovoada',
    96: 'Trovoada com granizo',
    99: 'Trovoada com granizo forte',
};

const descreverClima = (codigo) => DESCRICOES[codigo] || 'Condição desconhecida';

const buscarCoordenadas = async (cidade) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&countryCode=BR&format=json`;

    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error('API_CLIMA_INDISPONIVEL');
    }

    const dados = await resposta.json();
    if (!dados.results || dados.results.length === 0) {
        throw new Error('CIDADE_NAO_ENCONTRADA');
    }

    const { latitude, longitude, name } = dados.results[0];
    return { latitude, longitude, nome: name };
};

const buscarClimaAtual = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;

    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error('API_CLIMA_INDISPONIVEL');
    }

    const dados = await resposta.json();

    return {
        temperatura: dados.current.temperature_2m,
        condicao: descreverClima(dados.current.weather_code),
    };
};

const atualizarClimaDoUsuario = async (usuarioId, cidade) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
        throw new Error('USUARIO_NAO_ENCONTRADO');
    }

    const coordenadas = await buscarCoordenadas(cidade);
    const clima = await buscarClimaAtual(coordenadas.latitude, coordenadas.longitude);

    const dados = {
        usuario_id: usuarioId,
        cidade: coordenadas.nome,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        temperatura: clima.temperatura,
        condicao_clima: clima.condicao,
        consultado_em: new Date(),
    };

    const registro = await ClimaUsuario.findOne({ where: { usuario_id: usuarioId } });

    if (registro) {
        await registro.update(dados);
        return registro;
    }

    return await ClimaUsuario.create(dados);
};

const obterClimaDoUsuario = async (usuarioId) => {
    return await ClimaUsuario.findOne({ where: { usuario_id: usuarioId } });
};

module.exports = { atualizarClimaDoUsuario, obterClimaDoUsuario };
