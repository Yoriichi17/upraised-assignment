const { Gadget } = require('../models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone')
// Codename generator
const codenames = [
  'Captain America',
  'Iron Man',
  'Thor',
  'Hulk',
  'Hawkeye',
  'Black Widow',
  'Falcon',
  'Winter Soldier',
  'Wasp',
  'Quicksilver'
];
const randomCodename = () => codenames[Math.floor(Math.random() * codenames.length)];

// random mission success %
const missionSuccess = () => Math.floor(Math.random() * 51) + 50; 

// format gadget to IST
const formatToIST = (gadget) => ({
  id: gadget.id,
  codename: gadget.codename,
  status: gadget.status,
  createdAt: moment(gadget.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: moment(gadget.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
  decommissionedAt: gadget.decommissionedAt
    ? moment(gadget.decommissionedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
    : null
});


// GET 
exports.getGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status } : {};

    const gadgets = await Gadget.findAll({ where: whereClause });

    const gadgetsWithFormatted = gadgets.map(g => ({
      ...formatToIST(g),
      successProbability: `${missionSuccess()}% success probability`
    }));

    return res.json(gadgetsWithFormatted);
  } catch (err) {
    console.error('Gadget fetch failed:', err.message);
    return res.status(500).json({ error: 'Failed to fetch gadgets' });
  }
};

// POST 
exports.addGadget = async (req, res) => {
  try {
    const newGadget = await Gadget.create({
      id: uuidv4(),
      codename: randomCodename(),
      status: 'Available',
    });

    return res.status(201).json({
      message: 'Gadget added',
      gadget: formatToIST(newGadget)
    });
  } catch (err) {
    console.error('Add gadget failed:', err.message);
    return res.status(500).json({ error: 'Failed to add gadget' });
  }
};

// PATCH 
exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id.trim());

    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    await gadget.update(req.body);

    return res.json({ message: 'Gadget updated', gadget: formatToIST(gadget) });
  } catch (err) {
    console.error('Update failed:', err.message);
    return res.status(500).json({ error: 'Failed to update gadget' });
  }
};

// DELETE 
exports.softDeleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    await gadget.update({
      status: 'Decommissioned',
      decommissionedAt: moment().tz('Asia/Kolkata').toDate(),
    });

    return res.json({ message: 'Gadget decommissioned', gadget: formatToIST(gadget) });
  } catch (err) {
    console.error('Decommission failed:', err.message);
    return res.status(500).json({ error: 'Failed to decommission gadget' });
  }
};

// SELF-DESTRUCT
exports.selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);

    await gadget.update({ status: 'Destroyed' });

    return res.json({
      message: 'Self-destruct sequence triggered',
      confirmationCode,
      gadget: formatToIST(gadget)
    });
  } catch (err) {
    console.error('Self-destruct failed:', err.message);
    return res.status(500).json({ error: 'Failed to self-destruct gadget' });
  }
};