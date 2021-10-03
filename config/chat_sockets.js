
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){                   //on receiving request to join room
            console.log('joining request rec.', data);

            socket.join(data.chatroom);                    //wn the joining rqst has been received i want that user to join the room

            io.in(data.chatroom).emit('user_joined', data); //we emit an event inside room to tell whole room that someone has joined the room
        })                                                //wn we have to emit inside the room we use io.in
        
                // CHANGE :: detect send_message and broadcast to everyone in the room
                socket.on('send_message', function(data){
                    io.in(data.chatroom).emit('receive_message', data);
                });
    });

}

