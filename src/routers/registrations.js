const express = require('express');
const router = express.Router();
const {
    getHashPassword
} = require("../utils//hashing");
const {
    createUser,
} = require("../models/model");

const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    // Get the username and password from request body
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ error: 'Missing fields in request' });
    }
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hashedPassword = await getHashPassword(password);
    const user = await createUser(username,hashedPassword);
    // Save the user using the prisma user model, setting their password to the hashed version
    
    // Respond back to the client with the created users username and id
    res.status(201).json({ user })
});

module.exports = router;
