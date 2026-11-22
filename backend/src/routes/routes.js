const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');
const livroRoutes = require('./livroRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes );
router.use('/', authRoutes);
router.use('/livros', livroRoutes);

module.exports = router;