# Biblioteca — Projeto Final de Desenvolvimento Web III

Sistema web de biblioteca pessoal, desenvolvido com frontend e backend. O projeto permite que o usuário faça login utilizando e-mail e senha ou sua conta Google, pesquise livros através da API Open Library e organize sua própria estante, podendo definir o status de leitura e atribuir notas aos livros.

## Funcionalidades

- Login utilizando e-mail e senha ou conta Google.
- Autenticação de usuários utilizando tokens JWT.
- Busca de livros através da API Open Library.
- Cadastro de livros em uma estante pessoal.
- Organização dos livros por status de leitura: quero ler, lendo e lido.
- Possibilidade de atribuir notas de 1 a 5 aos livros.
- Página inicial mostrando a quantidade de livros na estante e os livros que estão sendo lidos.
- Cadastro, edição, exclusão e consulta de usuários.
- Consulta da previsão do tempo através da API Open-Meteo.
- Documentação das rotas utilizando Swagger.
- Opção de alterar entre tema claro e escuro.

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express, Sequelize, MySQL, bcrypt e JWT |
| Frontend | React, Vite, React Router e Axios |
| APIs externas | Open Library, Open-Meteo e Google Identity |
| Documentação | Swagger |

## Estrutura de pastas

O projeto foi organizado em duas partes principais: backend e frontend.

**Backend:**
- config: configurações do Sequelize.
- controllers: recebem as requisições e retornam as respostas.
- docs: configurações da documentação Swagger.
- instances: conexão com o banco de dados MySQL.
- middlewares: autenticação dos usuários através de tokens.
- migrations: criação das tabelas do banco de dados.
- models: modelos das tabelas Usuario, Livro e ClimaUsuario.
- routes: configuração das rotas da aplicação.
- services: regras de negócio e comunicação com APIs externas.
- server.js: inicialização do servidor.

**Frontend:**
- components: componentes reutilizáveis da aplicação.
- contexts: gerenciamento da autenticação do usuário.
- pages: páginas principais do sistema, como Home, Login, Biblioteca e Usuários.
- services: comunicação com o backend utilizando Axios.
- App.jsx: configuração principal da aplicação.
- main.jsx: ponto de entrada do frontend.

## Como executar o projeto

### Backend

Para executar o backend, é necessário acessar a pasta correspondente e instalar as dependências:

```bash
cd backend
npm install
```

Depois, é necessário configurar o arquivo `.env` com as informações de conexão do banco MySQL, porta do servidor, chave JWT e identificação do cliente Google.

Para criar as tabelas e iniciar o servidor, foram utilizados os seguintes comandos:

```bash
npx sequelize-cli db:migrate
npm start
```

### Frontend

Para executar o frontend, é necessário acessar sua pasta e instalar as dependências:

```bash
cd frontend
npm install
```

Também é necessário configurar o arquivo `.env` com o ID do cliente Google.

Para iniciar a aplicação, utilizar:

```bash
npm run dev
```

### Login com Google

Para utilizar o login com Google, é necessário criar um ID de cliente OAuth através do Google Cloud Console, configurar as origens JavaScript autorizadas e utilizar o mesmo ID nas configurações do backend e frontend.

## Documentação da API

A documentação das rotas foi desenvolvida utilizando Swagger.

Com o backend em execução, é possível acessar a documentação pelo endereço:

```text
http://localhost:3000/api-docs
```

Através dela, é possível visualizar e testar as rotas disponíveis na aplicação. Para testar as rotas protegidas, é necessário realizar o login e utilizar o token JWT recebido na autenticação.

## Banco de dados

O projeto utiliza um banco de dados MySQL compartilhado. Algumas tabelas já existiam anteriormente, como a tabela de usuários, que também possui a coluna `google_id`, utilizada na autenticação com a conta Google.

As novas tabelas criadas pelo projeto possuem o prefixo `web3_`, sendo elas `web3_livros` e `web3_clima_usuarios`.

A criação dessas tabelas é realizada através das migrations do Sequelize.

## Próximos passos

- Implementar o upload de capas personalizadas utilizando MinIO, como atividade bônus da disciplina.

## Créditos

Os dados e as capas dos livros são fornecidos pela API Open Library. A previsão do tempo é obtida através da API Open-Meteo.

---

## Diário das aulas

### 05/08/2026

Feito em sala de aula no dia 05/08/26.

O professor começou a montar um servidor do zero, trabalhando tanto com o backend quanto com o frontend.

Comandos utilizados em aula:

```bash
npm init
npm i nodemon
npm i express
npm i cors
npm run start
npx serve .
npx serve frontend
```

### 12/08/2026

Foi ensinado a utilizar o ViaCEP durante essa aula, uma API que busca endereços através do CEP e retorna as informações no formato JSON.

Foi solicitada uma atividade utilizando a API do ViaCEP, fazendo com que as informações retornadas fossem apresentadas no formato XML.

### 19/08/2026

O professor passou como configurar as rotas do servidor e organizar a estrutura de pastas do projeto, separando melhor as responsabilidades de cada parte da aplicação.