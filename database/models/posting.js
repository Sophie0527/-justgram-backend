const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function readPostingList() {
    const postings = await prisma.$queryRaw`
    SELECT 
        postings.id,
        users.nickname AS username,
        postings.postingType,
        postings.contents
    FROM users
    JOIN postings ON postings.user_id = users.id;
    `
    return postings;
}

async function readPostingDetail() {
    const postings = await prisma.$queryRaw`
        SELECT 
        postings.id as postingID,
        users.nickname as username,
        postings.postingType,
        postings.contents,
        JSON_OBJECT('id', comments.id, 'comment', comments.comment) as comments
        FROM 
        users
        JOIN postings ON postings.user_id = users.id
        JOIN comments ON comments.posting_id = postings.id
        WHERE postings.id = 2;`
    return postings;
}

async function createPosting( createPostingDto ) {

    const {user_id, contents} = createPostingDto;
    const postings = await prisma.$queryRaw`
    INSERT INTO 
        postings(user_id, contents) 
    VALUES 
        (${user_id}, ${contents});
    `;
    return postings;
}

async function updatePosting( updatePostingDto ) {

    const {id, contents} = updatePostingDto;
    const postings = await prisma.$queryRaw`
    UPDATE 
        postings 
    SET 
        contents = ${contents}
    WHERE 
        id=${id}
    `;
    return postings;
}


async function deletePosting( id ) {
    const postings = await prisma.$queryRaw`
    DELETE FROM 
        postings 
    WHERE 
        id=${id}
    `;
    return postings;
}

module.exports = { readPostingList, readPostingDetail, createPosting, updatePosting, deletePosting};