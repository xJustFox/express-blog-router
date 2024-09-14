const { readJSON, writeJSON } = require('../utils.js');
const posts = readJSON('postsDB')

module.exports = {
    index: (req, res) => {
        res.format({
            html: () => {
                let html = `<main>
                                <a href="/">Back Home</a>`;
                posts.forEach(({ title, content, img, tags }) => {
                    html += `<article style="margin: 30px 0; border-bottom: 1px solid;">
                                <h1>${title}</h1>
                                <img style="width: 20%;" src="${img}" alt="">
                                <ul style="display: flex; list-style: none outside none; margin: 0; padding: 0;">
                                    ${tags.map(tag => `<li style="margin-right: 5px;">#${tag.toLowerCase().replaceAll(' ', '-' )}</li>`).join(' ')}
                                </ul>
                                <p>${content}</p>
                            </article>`
                });

                res.send(html);
            },
            json: () => {
                res.json({
                    data: posts,
                    count: posts.length
                })
            }
        })
    },
    create: (req, res) => {
        try {
            writeJSON('postsDB', [...posts, req.body]);
            res.send('Post caricato correttamente');
        } catch (error) {
            res.send(error);
        }

    }
}