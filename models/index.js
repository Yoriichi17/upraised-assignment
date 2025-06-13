const sequelize = require('../config/db');
const Auth = require('./auth');
const Gadget = require('./gadget');

const db = {};
db.sequelize = sequelize;
db.Auth = Auth(sequelize);
db.Gadget = Gadget(sequelize);

module.exports = db;
