const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8883;

const StarCraft2Api = require('../starcraft2api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('json spaces', 2);

/** Applying JSON indentation for development environment */
if (process.env.NODE_ENV !== 'production') {
app.set('json spaces', 2);
}

// Routes

app.get('/', (req, res) => {
    res.json({ hello: 'world!' });
});

// Profile API

app.get('/server/:server/api/profile/static/profile/:region', (req, res) => {
    const { server, region } = req.params; 
    const SC2API = new StarCraft2Api(clientID, clientSecret);
    const static = SC2API.Profile().getStatic(server, region);

    res.json(static);
});

// starting server

module.exports = http.createServer(app).listen(port, () => {
    console.log(`API server started on port ${port}`); // eslint-disable-line no-console
});
