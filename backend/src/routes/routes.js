const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./autRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes );
router.use('/', authRoutes);

module.exports = router;