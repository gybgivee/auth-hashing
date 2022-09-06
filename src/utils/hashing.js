const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHashPassword = (password)=>{
    return bcrypt.hash(password, saltRounds);
}
const isPasswordMatch = (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}
module.exports = {
 getHashPassword,
 isPasswordMatch
}