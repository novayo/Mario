'use strict';
var mongojs = require('mongojs');
var db = mongojs('localhost:2001/mario', ['account', 'progress']);
const path = require('path');
const express = require('express');
const app = express();
const serv = require('http').createServer(app);


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'client') });
});

app.use('/client', express.static(__dirname + '/client'));


const SERVER_PORT = process.env.PORT || 2000;
app.set('port', SERVER_PORT);
// Start Express server
serv.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});


// socket
var SOCKET_LIST = {} // make a list to store every new connection

var Entity = function () {
    var self = {
        x: 250,
        y: 250,
        speedX: 0,
        speedY: 0,
        id: "",
    }

    self.update = function () {
        self.updatePos();
    }

    self.updatePos = function () {
        self.x += self.speedX;
        self.y += self.speedY;
    }

    self.getDistance = function (pt) {
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    }

    return self;
}

var Player = function (id) {
    var self = Entity();
    self.id = id;
    self.number = "" + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.maxSpeed = 10;
    self.hp = 10;
    self.hpMax = self.hp;
    self.score = 0;

    var superUpdate = self.update;
    self.update = function () {
        self.updateSpeed();
        superUpdate();

        if (self.pressingAttack) {
            self.shootBullet(self.mouseAngle);
        }
    }
    var superUpdatePos = self.updatePos;
    self.updatePos = function(){
        superUpdatePos();
        if (self.x < 0) self.x = 0;
        if (self.x > 500 - 30) self.x = 500 - 30;
        if (self.y < 0 + 40) self.y = 0 + 40;
        if (self.y > 500) self.y = 500;
    }

    self.shootBullet = function (angle) {
        var bullet = Bullet(self.id, angle);
        bullet.x = self.x;
        bullet.y = self.y;
    }

    self.updateSpeed = function () {
        if (self.pressingRight) self.speedX = self.maxSpeed;
        else if (self.pressingLeft) self.speedX = -self.maxSpeed;
        else self.speedX = 0;

        if (self.pressingUp) self.speedY = -self.maxSpeed;
        else if (self.pressingDown) self.speedY = self.maxSpeed;
        else self.speedY = 0;
    }

    Player.list[id] = self;

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            hpMax: self.hpMax,
            score: self.score,
        };
    }
    self.getUpdatePack = function () {
        return {
            x: self.x,
            y: self.y,
            id: self.id,
            hp: self.hp,
            score: self.score,
        };
    }
    initpack.player.push(self.getInitPack());
    return self;
}
Player.list = {};
Player.onConnect = function (socket) {
    var player = Player(socket.id);
    socket.on('keypress', function (data) {
        if (data.id === 'right')
            player.pressingRight = data.state;
        else if (data.id === 'left')
            player.pressingLeft = data.state;
        else if (data.id === 'down')
            player.pressingDown = data.state;
        else if (data.id === 'up')
            player.pressingUp = data.state;
        else if (data.id === 'attack')
            player.pressingAttack = data.state;
        else if (data.id === 'mouseAngle')
            player.mouseAngle = data.state;
    });

    socket.emit('init', {
        player: Player.getAllInitPack(),
        bullet: Bullet.getAllInitPack(),
    })
}
Player.getAllInitPack = function () {
    var players = [];
    for (var i in Player.list)
        players.push(Player.list[i].getInitPack());
    return players;
}

Player.onDisconnect = function (socket) {
    delete Player.list[socket.id]; // delete the socket from list
    removepack.player.push(socket.id);
}
Player.update = function () {
    var pack = []; // to store every element from socket
    for (var i in Player.list) {
        var player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
}

var Bullet = function (parent, angle) {
    var self = Entity();
    self.id = Math.random();
    self.parent = parent;
    self.speedX = Math.cos(angle / 180 * Math.PI) * 10;
    self.speedY = Math.sin(angle / 180 * Math.PI) * 10;

    self.timer = 0;
    self.toRemove = false;
    var superUpdate = self.update;
    self.update = function () {
        if (self.timer++ > 100)
            self.toRemove = true;
        superUpdate();

        for (var i in Player.list) {
            var pt = Player.list[i];
            if (self.getDistance(pt) < 32 && self.parent !== pt.id) {
                pt.hp--;
                if (pt.hp <= 0) {
                    var shooter = Player.list[self.parent];
                    if (shooter) {
                        shooter.score++;
                    }
                    pt.hp = pt.hpMax;
                    pt.x = Math.random()*500;
                    pt.y = Math.random()*500;
                }
                self.toRemove = true; // for remove bullet
            }
        }
    }

    Bullet.list[self.id] = self;

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
        };
    }
    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
        };
    }
    initpack.bullet.push(self.getInitPack());
    return self;
}
Bullet.list = {}
Bullet.update = function () {
    var pack = []; // to store every element from socket
    for (var i in Bullet.list) {
        var bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove) {
            delete Bullet.list[i];
            removepack.bullet.push(bullet.id);
        } else {
            pack.push(bullet.getInitPack());
        }
    }
    return pack;
}
Bullet.getAllInitPack = function () {
    var bullets = [];
    for (var i in Bullet.list)
        bullets.push(bullets.list[i].getInitPack());
    return bullets;
}

var isValidPassword = function (data, callback) {
    db.account.find({ username: data.username, password: data.password }, (err, res) => {
        if (res.length > 0) callback(true);
        else callback(false);
    });
}
var isUsernameTaken = (data, callback) => {
    db.account.find({ username: data.username }, (err, res) => {
        if (res.length > 0) callback(true);
        else callback(false);
    });
}

var addUser = (data, callback) => {
    db.account.insert({ username: data.username, password: data.password }, (err) => {
        callback();
    });
}

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
    socket.id = Math.random(); // create socket element
    SOCKET_LIST[socket.id] = socket; // add socket in to list
    console.log('socket.id = ' + socket.id);

    socket.on('signIn', function (data) {
        isValidPassword(data, function (res) {
            if (res) {
                Player.onConnect(socket);
                socket.emit('signInResponse', {
                    success: true,
                    id: socket.id,
                });
            } else {
                socket.emit('signInResponse', {
                    success: false
                });
            }
        })
    });
    socket.on('signUp', function (data) {
        isUsernameTaken(data, function (res) {
            if (res) {
                socket.emit('signUpResponse', {
                    success: false
                });
            } else {
                addUser(data, function () {
                    socket.emit('signUpResponse', {
                        success: true
                    });
                });
            }
        });
    });

    socket.on('disconnect', function () { // delete when leave or reflesh the page (disconnect is default argument)
        delete SOCKET_LIST[socket.id]; // delete the socket from list
        Player.onDisconnect(socket);
    });
    socket.on('sendMsgToServer', function (data) { // delete when leave or reflesh the page (disconnect is default argument)
        var playerName = ("" + socket.id).slice(2, 7);
        for (var i in SOCKET_LIST) { // and loop for every socket to send data
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
        }
    });
    socket.on('debugToServer', function (data) { // delete when leave or reflesh the page (disconnect is default argument)
        var result = eval(data);
        socket.emit('debugToClient', result);
    });
});

var initpack = { player: [], bullet: [] };
var removepack = { player: [], bullet: [] };
setInterval(function () {
    var pack = {
        player: Player.update(),
        bullet: Bullet.update(),
    }
    for (var i in SOCKET_LIST) { // and loop for every socket to send data
        SOCKET_LIST[i].emit('init', initpack);
        SOCKET_LIST[i].emit('update', pack);
        SOCKET_LIST[i].emit('remove', removepack);
    }
    initpack.player = [];
    initpack.bullet = [];
    removepack.player = [];
    removepack.bullet = [];
}, 1000 / 25);

module.exports = app;