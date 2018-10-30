const express = require('express');
const path = require('path');
var app = express();
var http = require('http').Server(app);


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/splitnass-table'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/splitnass-table/index.html'));
});

var io = require('socket.io')(http);
io.on('connect',socket => {
    console.log(`Client ${socket.client.conn.remoteAddress} connected`);
    socket.on("disconnect", () => {
        console.log(`Client ${socket.client.conn.remoteAddress} disconnected`);
    });
    socket.on("spieltag", data => {
        console.log(`sending updated spieltag`);
        io.compress(true).emit("spieltag", data);
    });
});

const port = process.env.PORT || 4200;
http.listen(port);
console.log(`server running on port ${port}`);

