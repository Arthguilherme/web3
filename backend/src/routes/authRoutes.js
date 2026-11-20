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
//router.post('/auth/google', authController.loginGoogle);

module.exports = router;