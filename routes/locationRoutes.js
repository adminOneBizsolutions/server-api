const LocationController = require('../controllers/LocationController');

const express = require('express');
const router = express.Router();

// Via User's Coordinates
// localhost:8001/business/api/search/coords/
router.get('/search/v1', LocationController.getBusinessViaCoords);

// Via State
// localhost:8001/business/api/search/state/
router.get('/search/v2/', LocationController.getBusinessViaState);

module.exports = router