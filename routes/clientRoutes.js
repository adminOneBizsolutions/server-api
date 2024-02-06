const ClientController = require('../controllers/ClientController');

const express = require('express');
const router = express.Router();

// Via User's Coordinates
// localhost:8001/api/v1/client/information/
router.get('/information/', ClientController.createClient);


module.exports = router