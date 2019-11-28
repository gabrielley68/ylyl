import React, { useState, useEffect } from 'react';
import moment from "moment";
import { WebSocketHelper } from "../utils";

function Chat(props){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        let newSocket = new WebSocketHelper(
            window.location.host + "/ws/chat/" + props.roomId + '/',
            onMessage, setSocket
        )
    }, []);

    function onMessage(e){
        let data = JSON.parse(e.data);
        let message = {
            content: data['message'],
            author: data['user'],
            date: moment()
        }
        setMessages(oldMessages => [...oldMessages, message]);
    }

    function onSubmit(ev){
        ev.preventDefault();
        try{
            socket.send(JSON.stringify({
                'message': messageInput
            }));
            setMessageInput("");
        } catch (error){
            console.error(error);
        }
    }

    return (
        <div className="columns">
            <div className="column is-three-quarters">
                <h4 className="is-h4 subtitle">Messages</h4>
                <hr/>
                <div style={{"height": "50vh", "overflowY": "scroll"}}>
                    {messages.map(message => (
                        <article className="media" key={"msg"+message.author+message.date.valueOf}>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{message.author}</strong>
                                        <small> - {message.date.format('HH:mm:ss')}</small>
                                        <br/>
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <form onSubmit={ev => onSubmit(ev)}>
                    <div className="field" style={{"marginTop": "15px"}}>
                        <div className="control">
                            <input
                                className="input" type="text" placeholder="Enter message" value={messageInput}
                                 onChange={ev => setMessageInput(ev.target.value)} autoFocus
                            >
                            </input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary is-pulled-right">Send</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="column">
                <h4 className="is-h4 subtitle">Members</h4>
                <hr/>
            </div>
        </div>
    );
}

export default Chat;