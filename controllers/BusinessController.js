const { request, response } = require('express');
const Business = require('../models/Business');

// Register a Business Via Yelp
module.exports = {
    registerBusiness: async (request, response) => {
        try {        
            // Check if a business with the same name already exists
            const existingBusiness = await Business.findOne({ name: request.body.name });
        
            if (existingBusiness) {
                return response.status(400).json({ message: "Business name is already registered!" });
            }
        
            // Create a new business with data from the request
            const newBusiness = new Business({
                id: request.body.id,
                alias: request.body.alias,
                name: request.body.name,
                image_url: request.body.image_url,
                is_closed: request.body.is_closed,
                url: request.body.url,
                review_count: request.body.review_count,
                categories: request.body.categories,
                rating: request.body.rating,
                coordinates: request.body.coordinates,
                transactions: request.body.transactions,
                location: request.body.location,
                phone: request.body.phone,
                display_phone: request.body.display_phone,
                distance: request.body.distance
            });
        
            // Save the new business to the database
            const created_business = await newBusiness.save();
        
            response.status(201).json({
                message: 'Business successfully registered!',
                businessId: created_business._id 
            });
    
        } catch (error) {
            console.error('Error in registerBusiness:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllBusiness: async (request, response) => {
        try {

            const businesses = await Business.find({});
    
            response.status(200).json(businesses);
        } catch (error) {
            console.error('Error in getAllBusiness:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },
    registerMultipleBusiness: async (request, response) => {
        console.log(request);
    }
}
