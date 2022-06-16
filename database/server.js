const express = require('express');

const userRouter = require('./routes/users')
const postingRouter = require('./routes/postings')

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(postingRouter);

module.exports = app;