const BusinessController = require('../controllers/BusinessController');

const express = require('express');
const router = express.Router();

// Create a Business
router.post('/register', BusinessController.registerBusiness);

// Get a Business
router.get('/view-all', BusinessController.getAllBusiness);

router.post('/register-multiple', BusinessController.registerMultipleBusiness);

// Query a Business using Coords

// Query a Business using State

module.exports = router