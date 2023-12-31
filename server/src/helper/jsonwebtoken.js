const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expireIn) => {

    if (!payload || typeof payload !== 'object' || Object.keys(payload).length === 0) {
        throw new Error("Payload must be a non-empty object");
    }

    if (typeof secretKey !== 'string' || secretKey.trim() === '') {
        throw new Error("Secret Key must be a non-empty string");
    }
    try {
        const token = jwt.sign(payload, secretKey, {
            expiresIn: expireIn
          });
          return token; 
    } catch (error) {
     
        console.error('Failed to sign in the JWT:', error);
        throw error;  
     
    }

};

module.exports = { createJSONWebToken };
