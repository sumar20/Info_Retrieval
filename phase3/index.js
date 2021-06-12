const { 
    Client 
} = require('@elastic/elasticsearch')
const express = require('express');
const app = express();
let json = require('../data.json');


const config = require('config');
const elasticConfig = config.get('elastic');

const client = new Client({
    cloud: {
        id: elasticConfig.cloudID
    },
    auth: {
        username: elasticConfig.username,
        password: elasticConfig.password
    },
    node: 'http://localhost:9200'
})

async function scan(query) {
    const { 
        body } = await client.search({
        index: 'cs172',
        body: {
            query: {
                match: { html: query }
            }
        }
    })
    console.log('Searching... : ' + query);
    return body.hits.hits;
} 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/search.js', (req, res) => {
    res.sendFile(__dirname + '/search.js');
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.get("/search/:query", (req, res) => {
    var query = req.params.query;
    console.log(query);
    scan(query)
    .catch(console.log)
    .then(data => {
        res.send(data);
    })
}) 

app.listen(3000, () => {
    console.log("listening on the port 3000 ");
})