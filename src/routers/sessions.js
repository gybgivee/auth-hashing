const express = require('express');
const router = express.Router();
const {
    getHashPassword,
    isPasswordMatch
} = require("../utils//hashing");
const {
    getUserByUsername,
} = require("../models/model");
const createToken = require("../utils/token");

const secretKey = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    // Get the username and password from the request body
    const user = await getUserByUsername(username);
    if (user) {
        const checkPassword = await isPasswordMatch(password, user.password);

        if (checkPassword) {
            const token = createToken(password, secretKey);
            console.log(token);
            return res.status(200).json({token});
        }
    }
    return res.status(401).json({ error: 'Invalid username or password' });
    // Check that a user with that username exists in the database
    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
});

module.exports = router;
