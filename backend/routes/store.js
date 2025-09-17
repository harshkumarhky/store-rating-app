const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const { authRequired, allowRoles } = require('./middleware');

router.get('/', authRequired, async (req,res) => {
  const { name, address, sortBy='name', order='ASC' } = req.query;
  const where = {};
  if(name) where.name = { [require('sequelize').Op.like]: `%${name}%` };
  if(address) where.address = { [require('sequelize').Op.like]: `%${address}%` };
  const stores = await Store.findAll({ where, order: [[sortBy, order]] });
  const results = await Promise.all(stores.map(async s=>{
    const avg = await Rating.findAll({ where:{ storeId: s.id }, attributes: [[require('sequelize').fn('avg', require('sequelize').col('score')), 'avgScore']] });
    const avgScore = avg[0].get('avgScore');
    return { ...s.toJSON(), averageRating: avgScore ? Number(Number(avgScore).toFixed(2)) : null };
  }));
  res.json(results);
});

router.get('/owner/:storeId/ratings', authRequired, allowRoles('STORE_OWNER','SYSTEM_ADMIN'), async (req,res) => {
  const { storeId } = req.params;
  const ratings = await Rating.findAll({ where: { storeId }, include: [{ model: User, attributes: ['id','name','email'] }] });
  const avg = await Rating.findAll({ where:{ storeId }, attributes: [[require('sequelize').fn('avg', require('sequelize').col('score')), 'avgScore']] });
  const avgScore = avg[0].get('avgScore');
  res.json({ ratings, averageRating: avgScore ? Number(Number(avgScore).toFixed(2)) : null });
});

module.exports = router;
