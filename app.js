var express = require('express');
var app = express();
const server = require('http').createServer(app);
app.use(express.static(__dirname + '/public')); //__dir and not _dir

const SERVER_PORT = process.env.PORT || 2000;
app.set('port', SERVER_PORT);

// Start Express server
server.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});