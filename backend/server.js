const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
  } catch (e) {
    console.error(e);
  }
});
