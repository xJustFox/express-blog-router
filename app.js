const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routers/posts.js');

// generic middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile( path.join(__dirname,'./index.html')));

app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));