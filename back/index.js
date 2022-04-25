import express from 'express';
import cors from 'cors';

const users = [];
const tweets = [];

for (let i = 1; i < 31; i++) {
    tweets.push({ username: 'John', tweet: `${i}`, avatar: 'https://geekdama.com.br/wp-content/uploads/20…ar-5-fanart-autor-desconhecido-postcover.jpg' });
}

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', (req, res) => {
    const user = req.body;
    if (user.username && user.avatar) {
        const userObj = {
            username: user.username,
            avatar: user.avatar
        }
        users.push(userObj);
        res.status(201).send('OK');
    }
    else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
})

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    const username = req.headers.user;
    if (username && tweet.tweet) {
        const tweetObj = {
            username: username,
            tweet: tweet.tweet
        }
        tweets.push(tweetObj);
        res.status(201).send('OK');
    }
    else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
})

app.get('/tweets', (req, res) => {
    let page = req.query.page;
    if (page && page >= 1) {
        let lastTweets = tweets.slice(- page * 10, tweets.length - (page - 1) * 10);
        tweets.forEach(tweet => {
            users.forEach(user => {
                if (tweet.username === user.username) {
                    tweet.avatar = user.avatar;
                }
            })
        })
        res.send(lastTweets);
    }
    else {
        res.status(400).send('Informe uma página válida!');
    }

})

app.get('/tweets/:USERNAME', (req, res) => {
    const username = req.params.USERNAME;
    let userTweets = [];
    tweets.forEach(tweet => {
        if (tweet.username === username) {
            userTweets.push(tweet);
        }
    })
    res.send(userTweets);
})

app.listen(5000);
