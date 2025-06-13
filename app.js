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
app.get('/', (req, res) => {
  res.send(`
    <h2>IMF Gadget API is up and running!</h2>
    <p>Use Postman or the following endpoints:</p>
    <ul>
      <li>POST /auth/register</li>
      <li>POST /auth/login</li>
      <li>GET /gadgets</li>
      <li>POST /gadgets</li>
      <li>PATCH /gadgets/:id</li>
      <li>DELETE /gadgets/:id</li>
      <li>POST /gadgets/:id/self-destruct</li>
    </ul>
    <p><em>Visit the <a href="https://www.postman.com/maintenance-cosmologist-12845390/workspace/anirudh/collection/31320871-122bc85a-0279-4191-96cb-83de309392ce?action=share&creator=31320871" target="_blank">Postman Collection</a> to try it out.</em></p>
  `);
});
