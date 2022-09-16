const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Http Server
        this.server = http.createServer(this.app);
        /// Configuraciones de sockets
        this.io = socketio(this.server,{/* configuraciones */});
    }
    middlewares() {
        this.app.use(cors());
        this.app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname,'../../public/index.html'));
        });
    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {
        ////////// inicia todos los middlewares ////
        this.middlewares();
        /////// inicia sockets ////
        this.configSockets();
        //// inicia server ////
        this.server.listen(this.port, () => {
            console.log('listening on *:',this.port);
        });
    }
}

module.exports = Server;