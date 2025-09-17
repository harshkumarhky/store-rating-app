const express = require('express');
const router = express.Router();
const { Rating, Store, User } = require('../models');
const { authRequired } = require('./middleware');

router.post('/', authRequired, async (req,res) => {
  const { storeId, score, comment } = req.body;
  if(!storeId || !score) return res.status(400).json({ error: 'storeId and score required' });
  if(score<1 || score>5) return res.status(400).json({ error: 'score must be 1-5' });
  const existing = await Rating.findOne({ where: { storeId, userId: req.user.id } });
  if(existing){
    existing.score = score; existing.comment = comment; await existing.save();
    return res.json(existing);
  }
  const r = await Rating.create({ storeId, score, comment, userId: req.user.id });
  res.json(r);
});

router.get('/mine/:storeId', authRequired, async (req,res) => {
  const r = await Rating.findOne({ where: { storeId: req.params.storeId, userId: req.user.id } });
  res.json(r);
});

module.exports = router;
