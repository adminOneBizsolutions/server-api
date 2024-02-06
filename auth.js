const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.JWT_SECRET || 'api_actual_secret_key_is_007';

// JWT Generator
module.exports.createAccessToken = (user) => {
  try {
    const data = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    };
    const token = jwt.sign(data, secret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error('Error while creating the access token.');

  }
};

// JWT Authenticator
module.exports.verifyAuthToken = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const tokenString = authHeader.split(' ')[1]; 
    jwt.verify(tokenString, secret, (error, decoded) => {
      if (error) {
        console.error('Token verification error:', error);
        return response.status(401).json({ error: "Unauthorized: Invalid token" });
      }
      next();
    });
  } else {
    return response.status(401).json({ error: "Unauthorized: No token provided" });
  }
};

// JWT Decoder
module.exports.decodeToken = (token) => {
  if (typeof token !== 'undefined') {
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    return jwt.verify(tokenWithoutBearer, secret, (error, data) => {
      if (error) {
        return null;
      } else {
        return jwt.decode(tokenWithoutBearer, { complete: true }).payload;
      }
    });
  } else {
    return null;
  }
};