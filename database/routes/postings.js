const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express');

const {readPostController, readPostDetailController, createPostingController, updatePostingController, deletePostingController} = require('../controllers/posting')

const router = express.Router();


router.get('/postings', readPostController);


router.get('/postings/2', readPostDetailController);


router.post('/postings', createPostingController);


router.put('/postings/:id', updatePostingController);


router.delete('/postings/:id', deletePostingController);


module.exports  = router;




//==================================== Layered Pattern 이전 코드

// router.get('/postings', async (req,res) => {
//     const postings = await prisma.$queryRaw`
//     SELECT 
//         postings.id,
//         users.nickname AS username,
//         postings.postingType,
//         postings.contents
//     FROM users
//     JOIN postings ON postings.user_id = users.id;
//     `
//     res.json({data : postings});
// });

// router.get('/postings/2', async (req,res) => {
//     const postings = await prisma.$queryRaw`
//     SELECT 
//         postings.id as postingID,
//         users.nickname as username,
//         postings.postingType,
//         postings.contents,
//         JSON_OBJECT('id', comments.id, 'comment', comments.comment) as comments
//     FROM 
//         users
//     JOIN postings ON postings.user_id = users.id
//     JOIN comments ON comments.posting_id = postings.id
//     WHERE postings.id = 2;`
//     res.json({data : postings});
// });

// router.post('/postings', async (req,res) => {
//     try {
//     const { userId, contents } = req.body;
//     await prisma.$queryRaw`
//     INSERT INTO 
//         postings(user_id, contents) 
//     VALUES 
//         (${userId}, ${contents});
//     `;
//     } catch(err) {
//         res.status(500).json({ message: err.message })
//         return;
//     }
//     res.status(201).json({ message: "CREATED" })
// });

// router.put('/postings/:id', async (req,res) => {
//     const {id} = req.params;
//     const { contents } = req.body;
//     await prisma.$queryRaw`
//     UPDATE 
//         postings 
//     SET 
//         contents = ${contents}
//     WHERE 
//         id=${id}
//     `;
//     res.json({ message: "UPDATED" })
// });

// router.delete('/postings/:id', async (req,res) => {
//     const {id} = req.params
//     await prisma.$queryRaw`
//     DELETE FROM 
//         postings 
//     WHERE 
//         id=${id}
//     `;
//     return res.json({ message: "DELETED" })
// });

// module.exports  = router;