import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

function Chat() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [recipientType, setRecipientType] = useState("group");
    const [targetUser, setTargetUser] = useState("");
    const [targetGroup, setTargetGroup] = useState("");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7164/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log("Connected to SignalR hub!");
                    setupSignalRListeners();
                })
                .catch((e) => console.log("Connection failed: ", e));
        }
    }, [connection]);

    const setupSignalRListeners = () => {
        connection.on("ReceiveMessage", (user, message, timestamp) => {
            const formattedMessage = {
                user,
                message,
                timestamp,
            };
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        });
    };

    const sendMessage = async () => {
        if (connection && userMessage.trim()) {
            const payload = {
                user: "Student",
                message: userMessage,
                recipientType,
                targetUser: recipientType === "individual" ? targetUser : undefined,
                targetGroup: recipientType === "group" ? targetGroup : undefined,
            };
            await connection.send("SendMessage", payload);
            setUserMessage("");
        } else {
            alert("No connection to server yet or message is empty.");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <select value={recipientType} onChange={(e) => setRecipientType(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                </select>
                {recipientType === "individual" && (
                    <input
                        type="text"
                        placeholder="Recipient Username"
                        value={targetUser}
                        onChange={(e) => setTargetUser(e.target.value)}
                    />
                )}
                {recipientType === "group" && (
                    <input
                        type="text"
                        placeholder="Group ID"
                        value={targetGroup}
                        onChange={(e) => setTargetGroup(e.target.value)}
                    />
                )}
            </div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}</strong>: {msg.message} <span>[{msg.timestamp}]</span>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
