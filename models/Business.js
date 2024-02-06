const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID is required."]
  },
  alias: {
    type: String,
    required: [true, "Alias is required."]
  },
  name: {
    type: String,
    required: [true, "Business name is required."]
  },
  image_url: String,
  is_closed: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: [true, "URL is required."]
  },
  review_count: {
    type: Number,
    required: [true, "Review count is required."]
  },
  categories: [{
    alias: String,
    title: String
  }],
  rating: {
    type: Number,
    required: [true, "Rating is required."]
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  isViaYelp: {
    type: Boolean,
    default: true
  },
  transactions: [String],
  location: {
    address1: String,
    address2: String,
    address3: String,
    city: String,
    zip_code: String,
    country: String,
    state: String,
    display_address: [String]
  },
  phone: String,
  display_phone: String,
  distance: Number
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Indexes for efficient queries
businessSchema.index({ id: 1 });

module.exports = mongoose.model('Business', businessSchema);
