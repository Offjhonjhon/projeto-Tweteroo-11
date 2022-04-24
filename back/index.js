import express from 'express';
import cors from 'cors';

const users = [];
const tweets = [];

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', (req, res) => {
    const user = req.body;
    const userObj = {
        username: user.username,
        avatar: user.avatar
    }
    users.push(userObj);
    res.send("OK");
})

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    const tweetObj = {
        username: tweet.username,
        tweet: tweet.tweet
    }
    tweets.push(tweetObj);
    res.send("OK");
})

app.get('/tweets', (req, res) => {

})

app.listen(5000);
