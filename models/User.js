const mongoose = require('mongoose');
const validator = require('validator'); 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required."]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required."]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true, // Ensure email is unique
    validate: [validator.isEmail, 'Please fill a valid email address'], // Validate email format
    lowercase: true, // Convert email to lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required."]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String
  },
  contactNumber: {
    type: String
  },
  occupation: {
    type: String
  },
  birthday: {
    type: String
  },
  location: {
    type: Array
  },
  aboutMe: {
    type: String
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Virtual for user's full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure indexes (especially for fields used in queries and lookups)
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);