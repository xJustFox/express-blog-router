const path = require('path');
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
                                    ${tags.map(tag => `<li style="margin-right: 5px;">#${tag.toLowerCase().replaceAll(' ', '-')}</li>`).join(' ')}
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
    show: (req, res) => {
        const foundPosts = posts.find(post => post.slug === req.params.slug);
        if (foundPosts) {
            res.json(foundPosts);
        } else {
            res.status(404).json({
                error: "Not Found",
                description: `Post whit slug: ${req.params.slug} not exist`
            })
        }
    },
    downloadImage: (req, res) => {
        const foundPosts = posts.find(post => post.slug === req.params.slug)

        if (foundPosts) {
            if (foundPosts.img != "") {
                const filePath = path.join(__dirname, `../public/${foundPosts.img}`)            
                res.download(filePath);
            } else {
                res.status(404).json({
                    error: "Not Found",
                    description: `Image not found`
                })
            }
        } else {
            res.status(404).json({
                error: "Not Found",
                description: `Post whit slug: ${req.params.slug} not exist`
            })
        }
    },
    create: (req, res) => {
        res.format({
            'text/html': () => {
                try {
                    // writeJSON('postsDB', [...posts, req.body]);
                    res.send('<h1>Post loaded successfully</h1>');
                } catch (error) {
                    res.status(500).send('Error writing to database');
                }
            },

            default: () => {
                res.status(406).send('Not Acceptable')
            }
        })
    },
}