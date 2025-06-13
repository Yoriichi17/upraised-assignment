const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Gadget = sequelize.define('Gadget', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    codename: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
      defaultValue: 'Available',
    },
    decommissionedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Gadget;
};
