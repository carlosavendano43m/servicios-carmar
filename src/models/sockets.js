class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        // On connection
        this.io.on('connection', (socket) => {

            socket.on('msg-to-server', (data) => {         
               /*emite un mensaje a una sola ventana 
              socket.emit('msg-from-serve',data);*/
                console.log(data);
              //// emite a todas la ventanas ////
              this.io.emit('msg-from-serve',data);
            })
          
        });
          
    }
}

module.exports = Sockets;