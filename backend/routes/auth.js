const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function validName(name){ return typeof name==='string' && name.length>=20 && name.length<=60; }
function validPassword(p){ return typeof p==='string' && p.length>=8 && p.length<=16 && /[A-Z]/.test(p) && /[^A-Za-z0-9]/.test(p); }

router.post('/signup', async (req,res) => {
  try{
    const { name, email, password, address, role } = req.body;
    if(!validName(name)) return res.status(400).json({ error: 'Name must be 20-60 characters' });
    if(!validPassword(password)) return res.status(400).json({ error: 'Password requirements not met' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role: role || 'NORMAL_USER' });
    res.json({ id: user.id, email: user.email });
  }catch(e){
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, role: user.role, userId: user.id });
});

module.exports = router;
