const yelpService = require('../services/yelpService');

module.exports = {
  getBusinessViaCoords: async (req, res) => {
    try {
      const { latitude, longitude, term } = req.query;
  
  
      console.log(latitude, longitude, term);
      const data = await yelpService.searchBusinesses(latitude, longitude, term);
      
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getBusinessViaState: async (req, res) => {
    try {
      const { state, category } = req.query;
      
  
      console.log(state, category); 
      const data = await yelpService.searchBusinessViaCategory(state, category);
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}