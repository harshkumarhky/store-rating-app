const express = require('express');
const router = express.Router();
const auth = require('./auth');
const admin = require('./admin');
const store = require('./store');
const rating = require('./rating');

router.use('/auth', auth);
router.use('/admin', admin);
router.use('/stores', store);
router.use('/ratings', rating);

module.exports = router;
