class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket =io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {            //emit request(i.e send emit)   
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){   //To know wn the user has joined
                console.log('a user joined!', data);
            })


        });
    
        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        self.socket.on('receive_message', function(data){  //code below fom this is for left right of sent and received messages
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}