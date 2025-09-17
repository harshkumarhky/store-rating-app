const { sequelize, User, Store } = require('.');
(async () => {
  await sequelize.sync({ force: true });
  console.log('DB synced (force:true). Creating sample data...');

  const bcrypt = require('bcrypt');
  const pw = await bcrypt.hash('Admin@123', 10);
  await User.create({ name: 'System Administrator Demo User', email: 'admin@example.com', password: pw, address: 'HQ', role: 'SYSTEM_ADMIN' });

  const pw2 = await bcrypt.hash('User@1234', 10);
  await User.create({ name: 'Normal User Example Demo', email: 'user@example.com', password: pw2, address: 'User Address', role: 'NORMAL_USER' });

  const pw3 = await bcrypt.hash('Store@1234', 10);
  const storeOwner = await User.create({ name: 'Store Owner Example Demo', email: 'owner@example.com', password: pw3, address: 'Owner Address', role: 'STORE_OWNER' });
  await Store.create({ name: 'Demo Store', email: 'store@example.com', address: '123 Market Rd' });

  console.log('Sample data created.'); process.exit(0);
})();
