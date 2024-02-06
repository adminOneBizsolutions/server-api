const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../auth');
const { request, response } = require('express');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const minPasswordLength = 8;

const isValidInput = (body) => {
    if (!body.email || !emailRegex.test(body.email)) {
        return false;
    }
    if (!body.password || body.password.length < minPasswordLength) {
        return false;
    }
    return true;
};

// Updated Register Routes via App
module.exports = {
  register: async (request, response) => {
    try {
      if (!isValidInput(request.body)) {
        return response.status(400).json({ error: "Invalid email or password" });
      }
      
      const existingUser = await User.findOne({ email: request.body.email });
  
      if (existingUser) {
        return response.status(400).json({ message: "Email already registered!" });
      }
  
      const encrypted_password = await bcrypt.hash(request.body.password, 10);
      const newUser = new User({
        email: request.body.email,
        password: encrypted_password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
      });
  
      const created_user = await newUser.save();
  
      response.status(201).json({
        message: 'User successfully registered!',
        userId: created_user._id 
      });
  
    } catch (error) {
      console.error('Error in register:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  },
  login: async (request, response) => {
    try {
      const data = request.body;
      if (!data || !data.email || !data.password) {
        return response.status(400).send("Missing required fields.");
      }
  
      const user = await User.findOne({ email: data.email });
      if (!user) {
        return response.status(401).json({ message: "Invalid email!" });
      }

      if (!user.isActive) {
        return response.status(403).json({ message: "Account is inactive." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
      if (!isPasswordCorrect) {
        return response.status(401).json({ message: "Please provide the correct password!" });
      }
  
      return response.json({
        accessToken: auth.createAccessToken(user)    
      });
  
    } catch (error) {
      console.error('Error in login:', error);
      response.status(500).send("An error occurred. Please try again.");
    }
  },
  checkEmail: async (request, response) => {
    try {
      const emailToCheck = request.params.email;
  
      const result = await User.findOne({ email: emailToCheck }, { _id: 0, email: 1 });
  
      // Send back a boolean response
      response.status(200).json({ exists: !!result });
  
    } catch (error) {
      console.error('Error in checkIfEmailExists:', error);
      response.status(500).send('Internal Server Error');
    }
  },
  getDetails:  async (request, response) => {
    try {
      const user_data = auth.decodeToken(request.headers.authorization);
  
      if (!user_data || !user_data.id) {
        return response.status(401).json({ message: "Invalid token." });
      }
  
      const user = await User.findById(user_data.id).select('-__v -password -isActive');
      if (!user) {
        return response.status(404).json({ message: "User profile not found." });
      }
  
      response.status(200).json(user);
    } catch (error) {
      console.error('Error in getDetails:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  },
  updateUser: async (request, response) => {
    try {
      const id = request.params.userId;
      // console.log('Updating user with ID:', id);

      if (!request.body) {
        return response.status(400).json({ message: "No update information provided."});
      }
  
      // Update the user
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
          gender: request.body.gender,
          contactNumber: request.body.contactNumber,
          occupation: request.body.occupation,
          birthday: request.body.birthday,
          location: request.body.location,
          aboutMe: request.body.aboutMe
        }
      }, { new: true }); // 'new: true' returns the updated document
  
      if (!updatedUser) {
        return response.status(404).json({ message: "User profile not found."});
      }
  
      // Send the updated user back
      response.json(updatedUser);
  
    } catch (error) {
      console.error('Error in updateUser:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  },
  archiveAccount: async (request, response) => {
    try {
      const id = request.params.userId;
  
      if (!id) {
        return response.status(400).json({ message: "User ID is required." });
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
          isActive: false
        }
      }, { new: true }); 
  
      if (!updatedUser) {
        return response.status(404).json({ message: "User not found or already archived." });
      }
  
      response.json({ message: "User account successfully archived.", user: updatedUser });
  
    } catch (error) {
      console.error('Error in archiveAccount:', error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}