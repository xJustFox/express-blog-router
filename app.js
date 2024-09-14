const express = require('express');
const app = express();
const port = 3000;

const posts = require('./controllers/posts.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.send('<h1>Benvenuto nel mio blog!</h1>'));

app.get('/posts', posts.index);
app.post('/posts', posts.create);

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));