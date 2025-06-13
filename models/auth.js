// User model with hashed password
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Auth = sequelize.define('Auth', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Automatically hash password before saving
  Auth.beforeCreate(async (user) => {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (err) {
      throw new Error('Password hashing failed');
    }
  });

  return Auth;
};
