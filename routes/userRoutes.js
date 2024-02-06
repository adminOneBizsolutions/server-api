const UserController = require('../controllers/UserController');

const express = require('express');
const router = express.Router();
const auth = require('../auth');
const User = require('../models/User');

// Register Routes POST
// baseURL + /api/v1/users/register 
    // Request Body:
        // { "email": "dummy@mail.com", "password": "correct-password", "firstName": "John", "lastName": "Doe"}
    // Response Body: 
        // { "message": "User successfully registered!", "userId": "-----user-Id-----"}
router.post('/register', UserController.register);

// Login Routes POST
// baseURL + /api/v1/users/login 
    // Request Body:
        // { "email": "dummy@mail.com", "password": "correct-password" }
    // Response Body:
        // { "accessToken": "-----generated-token-here-----"}
router.post("/login", UserController.login);

// Check Email Routes GET
// baseURL + /api/v1/users/check-email/:email 
    // Request Params:
        // baseURL + /api/v1/users/check-email/dummy@mail.com 
    // Response Body:
        // { "exists": "true"}
router.get("/check-email/:email", UserController.checkEmail);

// User Details [ Via-Token ] GET
// baseURL + /api/v1/users/details
router.get("/details", auth.verifyAuthToken, UserController.getDetails);
    // Request Headers:
        // Bearer Token -----generated-token-here-----
    // Response Body:
        // { "location": [], "_id": "-----user-Id-----", "firstName": "John", "lastName": "Doe"}

// User Details [ Via-Token ] PUT
// baseURL + /api/v1/users/update-user/:id
    // Request Params:
        // baseURL + /api/v1/users/update-user/-----user-Id-----
    // Request Body:
        // { ""}
    // Response Body:
router.patch("/update/:userId", auth.verifyAuthToken, UserController.updateUser);

// Archive User's Account DELETE
// baseURL + api/v1/users/delete-account/:id
router.delete("/delete-account/:userId", auth.verifyAuthToken, UserController.archiveAccount);


module.exports = router