const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const { autenticar } = require('../middlewares/authMiddleware');
const climaController = require('../controllers/climaController');

router.get('/' , autenticar, usuarioController.buscarUsuarios);
router.post('/', usuarioController.criarUsuario);
router.delete('/:id', autenticar, usuarioController.excluirUsuario);
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);
router.put('/:id', autenticar, usuarioController.editarUsuario);

router.post('/:id/clima', autenticar, climaController.atualizarClima);
router.get('/:id/clima', autenticar, climaController.buscarClima);

module.exports = router;