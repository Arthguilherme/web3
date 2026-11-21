const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login e devolve um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: guilherme.web3.teste@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado. Retorna o token e os dados do usuário.
 *       401:
 *         description: Email ou senha inválidos.
 */

router.post('/login', authController.login);

/**
 * @openapi
 * /auth/google:
 *   post:
 *     tags: [Autenticação]
 *     summary: Login com Google. Recebe o token de identidade do Google e devolve o JWT da API.
 *     description: O campo credential é obtido pelo botão "Entrar com Google" do frontend. Cria o usuário se ele ainda não existir.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [credential]
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Token de identidade (ID token) emitido pelo Google.
 *     responses:
 *       200:
 *         description: Login realizado. Retorna o token da API e os dados do usuário.
 *       400:
 *         description: Credencial não enviada.
 *       401:
 *         description: Token do Google inválido ou expirado.
 *       403:
 *         description: E-mail da conta Google não verificado.
 *//**
 * @openapi
 * /auth/google:
 *   post:
 *     tags: [Autenticação]
 *     summary: Login com Google. Recebe o token de identidade do Google e devolve o JWT da API.
 *     description: O campo credential é obtido pelo botão "Entrar com Google" do frontend. Cria o usuário se ele ainda não existir.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [credential]
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Token de identidade (ID token) emitido pelo Google.
 *     responses:
 *       200:
 *         description: Login realizado. Retorna o token da API e os dados do usuário.
 *       400:
 *         description: Credencial não enviada.
 *       401:
 *         description: Token do Google inválido ou expirado.
 *       403:
 *         description: E-mail da conta Google não verificado.
 */

router.post('/auth/google', authController.loginGoogle);

module.exports = router;