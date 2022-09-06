const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create(
            {
                data: {
                    username,
                    password
                }

            });
        console.log({ user });
        return { status: 201, data: { user } }

    } catch (e) {
        console.log({ e });
        if (e instanceof Prisma.PrismauserKnownRequestError) {

            if (e.code === "P2002") {
                return { status: 409, data: { error: `A user with the provided field already exists` } }
            }
        }
        return;
    }

}
const getUserByUsername = async(username) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                username
            }
        });
        console.log({user});
        return user;

    } catch (e) {
        console.log({ e });
        return;
    }
}
module.exports = {
    createUser,
    getUserByUsername
}