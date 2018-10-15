const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use('/', express.static(__dirname + '/WebGame'));

app.get('/', (req, res) => {
    res.SendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port %d', process.env.PORT || 8080);
});