const express = require('express');
const router = express.Router();
const { User, Store, Rating } = require('../models');
const { authRequired, allowRoles } = require('./middleware');

router.get('/dashboard', authRequired, allowRoles('SYSTEM_ADMIN'), async (req,res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ users, stores, ratings });
});

router.post('/users', authRequired, allowRoles('SYSTEM_ADMIN'), async (req,res) => {
  try{
    const { name, email, password, address, role } = req.body;
    const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash(password, 10);
    const u = await User.create({ name, email, password: hashed, address, role });
    res.json(u);
  }catch(e){ res.status(400).json({ error: e.message }); }
});

router.get('/users', authRequired, allowRoles('SYSTEM_ADMIN'), async (req,res) => {
  const { q, sortBy='name', order='ASC', role } = req.query;
  const where = {};
  if(q) where.name = { [require('sequelize').Op.like]: `%${q}%` };
  if(role) where.role = role;
  const users = await User.findAll({ where, order: [[sortBy, order]] });
  res.json(users);
});

router.get('/stores', authRequired, allowRoles('SYSTEM_ADMIN'), async (req,res) => {
  const { q, sortBy='name', order='ASC' } = req.query;
  const where = {};
  if(q) where.name = { [require('sequelize').Op.like]: `%${q}%` };
  const stores = await Store.findAll({ where, order: [[sortBy, order]] });
  res.json(stores);
});

module.exports = router;
