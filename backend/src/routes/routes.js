const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes );
router.use('/', authRoutes);

module.exports = router;