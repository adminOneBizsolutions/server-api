const axios = require('axios');

const ipGeolocationApiKey = '1980c15e535246a9a96ffc34be4b5fb9';
const ipGeolocationApiUrl = 'https://api.ipgeolocation.io/ipgeo';

const ipGeolocation = {
    getGeolocation: async (ip) => {
        try {
            const geolocationResponse = await axios.get(`${ipGeolocationApiUrl}?apiKey=${ipGeolocationApiKey}&ip=${ip}`);
            return geolocationResponse.data;
        } catch (error) {
            console.error('Error in getGeolocation:', error);
            throw error; // Propagate the error to be handled by the caller
        }
    },

};

module.exports = ipGeolocation;
