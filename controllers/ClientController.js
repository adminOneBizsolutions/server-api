const Client = require('../models/Client');
const ipGeolocation = require('../services/ipGeolocation'); 
const yelpService = require('../services/yelpService');

// Register a Business Via Yelp
module.exports = {
  createClient: async (request, response) => {
      try {
          // Find client with the same IP or create a new one
          const existingClient = await Client.findOne({ ip: request.body.ip });

          if (existingClient) {
              // Record a new visit for the existing client
              await existingClient.recordVisit({ /* Visit details, if any */ });
              return response.status(200).json({
                  message: 'New visit recorded for existing client!',
                  clientId: existingClient._id
              });
          } else {
              // Create a new client with data from the request
              const newClient = new Client(request.body);
              // Initialize the first visit
              await newClient.recordVisit({ /* Initial visit details, if any */ });

              response.status(201).json({
                  message: 'Client successfully registered with initial visit!',
                  clientId: newClient._id
              });
          }
      } catch (error) {
          console.error('Error in createClient:', error);
          response.status(500).json({ error: 'Internal Server Error' });
      }
  }
}