const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = require('./models');
const authRoutes = require('./routes/authR');
const gadgetRoutes = require('./routes/gadgetR');

app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect DB:', err.message);
  });
