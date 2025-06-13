const express = require('express');
const router = express.Router();
const gadgetC = require('../controllers/gadgetC');
const authM = require('../middlewares/authM');

// All routes protected
router.get('/', authM, gadgetC.getGadgets);
router.post('/', authM, gadgetC.addGadget);
router.patch('/:id', authM, gadgetC.updateGadget);
router.delete('/:id', authM, gadgetC.softDeleteGadget);
router.post('/:id/self-destruct', authM, gadgetC.selfDestruct);

module.exports = router;
