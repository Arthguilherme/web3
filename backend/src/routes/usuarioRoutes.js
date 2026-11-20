const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const climaController = require('../controllers/climaController');
const { autenticar } = require('../middlewares/authMiddleware');

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 */
router.get('/', autenticar, usuarioController.buscarUsuarios);

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um usuário (rota pública, a senha é salva criptografada)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Teste
 *               email:
 *                 type: string
 *                 example: maria.teste@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado.
 *       500:
 *         description: Erro interno (por exemplo, e-mail já cadastrado).
 */
router.post('/', usuarioController.criarUsuario);

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Busca um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);

/**
 * @openapi
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Edita nome e/ou e-mail de um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Guilherme Teste Editado
 *               email:
 *                 type: string
 *                 example: guilherme.web3.teste@email.com
 *     responses:
 *       200:
 *         description: Usuário atualizado.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.put('/:id', autenticar, usuarioController.editarUsuario);

/**
 * @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Exclui um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete('/:id', autenticar, usuarioController.excluirUsuario);

/**
 * @openapi
 * /usuarios/{id}/clima:
 *   post:
 *     tags: [Clima]
 *     summary: Consulta o clima atual da cidade (Open-Meteo) e salva no banco
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cidade]
 *             properties:
 *               cidade:
 *                 type: string
 *                 example: Paranaguá
 *     responses:
 *       200:
 *         description: Clima consultado e salvo.
 *       400:
 *         description: Cidade não informada.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Usuário ou cidade não encontrados.
 *       502:
 *         description: Serviço de clima indisponível.
 */
router.post('/:id/clima', autenticar, climaController.atualizarClima);

/**
 * @openapi
 * /usuarios/{id}/clima:
 *   get:
 *     tags: [Clima]
 *     summary: Mostra o último clima salvo do usuário (sem chamar a API externa)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     responses:
 *       200:
 *         description: Clima salvo.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Nenhum clima salvo para este usuário.
 */
router.get('/:id/clima', autenticar, climaController.buscarClima);

module.exports = router;