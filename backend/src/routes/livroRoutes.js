const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const { autenticar } = require('../middlewares/authMiddleware');

router.use(autenticar);

/**
 * @openapi
 * /livros/buscar:
 *   get:
 *     tags: [Biblioteca]
 *     summary: Busca livros na Open Library (API externa)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: senhor dos aneis
 *     responses:
 *       200:
 *         description: Lista de livros encontrados (ol_key, titulo, autor, ano_publicacao, capa_url).
 *       400:
 *         description: Termo de busca ausente ou curto demais.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       502:
 *         description: Open Library indisponível.
 */
router.get('/buscar', livroController.buscar);

/**
 * @openapi
 * /livros:
 *   get:
 *     tags: [Biblioteca]
 *     summary: Lista os livros da minha biblioteca
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [quero_ler, lendo, lido]
 *     responses:
 *       200:
 *         description: Livros da biblioteca do usuário logado.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 */
router.get('/', livroController.listar);

/**
 * @openapi
 * /livros:
 *   post:
 *     tags: [Biblioteca]
 *     summary: Adiciona um livro à minha biblioteca
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ol_key, titulo]
 *             properties:
 *               ol_key:
 *                 type: string
 *                 example: OL27448W
 *               titulo:
 *                 type: string
 *                 example: The Lord of the Rings
 *               autor:
 *                 type: string
 *                 example: J. R. R. Tolkien
 *               ano_publicacao:
 *                 type: integer
 *                 example: 1954
 *               capa_url:
 *                 type: string
 *                 example: https://covers.openlibrary.org/b/id/258027-M.jpg
 *               status:
 *                 type: string
 *                 enum: [quero_ler, lendo, lido]
 *                 example: quero_ler
 *     responses:
 *       201:
 *         description: Livro adicionado.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       409:
 *         description: Este livro já está na lista.
 */
router.post('/', livroController.adicionar);

/**
 * @openapi
 * /livros/{id}:
 *   put:
 *     tags: [Biblioteca]
 *     summary: Altera o status e/ou a nota de um livro da minha biblioteca
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [quero_ler, lendo, lido]
 *                 example: lido
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       200:
 *         description: Livro atualizado.
 *       400:
 *         description: Status ou nota inválidos.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Livro não encontrado na sua lista.
 */
router.put('/:id', livroController.atualizar);

/**
 * @openapi
 * /livros/{id}:
 *   delete:
 *     tags: [Biblioteca]
 *     summary: Remove um livro da minha biblioteca
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
 *         description: Livro removido.
 *       401:
 *         description: Token não enviado, inválido ou expirado.
 *       404:
 *         description: Livro não encontrado na sua lista.
 */
router.delete('/:id', livroController.remover);

module.exports = router;