const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const { autenticar } = require('../middlewares/authMiddleware');

router.get('/' , autenticar, usuarioController.buscarUsuarios);
router.post('/', usuarioController.criarUsuario);
router.delete('/:id', autenticar, usuarioController.excluirUsuario);
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);
router.put('/:id', autenticar, usuarioController.editarUsuario);

module.exports = router;