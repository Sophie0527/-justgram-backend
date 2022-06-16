const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() 

async function getUserByEmail(email) {
    const [user] = await prisma.$queryRaw`
    SELECT 
        id, 
        email, 
        password
    FROM users
    WHERE email=${email}
    `;
    return user;
}

async function createUser(createUserDto) {
    const {email, password} = createUserDto;

    await prisma.$queryRaw`
    INSERT INTO 
        users(email, password) 
    VALUES (${email}, ${password})`;
}

module.exports = { getUserByEmail, createUser };