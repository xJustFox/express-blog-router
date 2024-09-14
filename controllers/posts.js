const path = require('path');
const { readJSON, writeJSON } = require('../utils.js');
const posts = readJSON('postsDB')

module.exports = {
    //index controller for the route /posts
    index: (req, res) => {
        res.format({
            html: () => {
                let html = `<main>
                                <a href="/"><button>Back Home</button></a>`;
                posts.forEach(({ title, content, img, tags, slug }) => {
                    html += `<article style="margin: 30px 0;">
                                <h1>${title}</h1>
                                <img style="width: 20%;" src="${img}" alt="">
                                <ul style="display: flex; list-style: none outside none; margin: 0; padding: 0;">
                                    ${tags.map(tag => `<li style="margin-right: 5px;">#${tag.toLowerCase().replaceAll(' ', '-')}</li>`).join(' ')}
                                </ul>
                                <p>${content}</p>
                                <a href="/posts/${slug}"><button>Show More</button></a>
                                <hr>
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
    //show controller for the route /posts/:slug where :slug is a dynamic parameter passed throug the url
    show: (req, res) => {
        const foundPost = posts.find(post => post.slug === req.params.slug);
        if (foundPost) {
            foundPost.img_download_url = `${req.protocol}://${req.headers.host}/posts/${foundPost.slug}/download`;

            res.format({
                html: (req, res) => {
                    const html = `<main>
                                        <a href="/posts"><button>Back Posts</button></a>
                                        <article style="margin: 30px 0;">
                                            <h1>${foundPost.title}</h1>
                                            <img style="width: 20%;" src="../${foundPost.img}" alt=""> <br>
                                            <ul style="display: flex; list-style: none outside none; margin: 0; padding: 0;">
                                                ${foundPost.tags.map(tag => `<li style="margin-right: 5px;">#${tag.toLowerCase().replaceAll(' ', '-')}</li>`).join('')}
                                            </ul>
                                            <p>${foundPost.content}</p>
                                            <a href="${foundPost.img_download_url}"><button>Download Image</button></a>
                                            <hr>
                                        </article>
                                    </main>`
                    res.send(html)
                },
                json: () => {
                    res.json(foundPost)
                },

                default: () => {
                    res.status(406).send('Not Acceptable')
                }
            });
        } else {
            res.status(404).json({
                error: "Not Found",
                description: `Post whit slug: ${req.params.slug} not found`
            })
        }
    },
    //downloadImage to download the single post imag
    downloadImage: (req, res) => {
        const foundPost = posts.find(post => post.slug === req.params.slug)

        if (foundPost) {
            if (foundPost.img != "") {
                const filePath = path.join(__dirname, `../public/${foundPost.img}`)            
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
    //create controller - at the moment its just displays an h1
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