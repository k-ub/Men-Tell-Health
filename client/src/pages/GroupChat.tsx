import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

interface RouteParams extends Record<string, string | undefined> {
  chatId: string;
}

interface Message {
  text: string;
}

const GroupChat: React.FC = () => {
  const { chatId } = useParams<RouteParams>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket: Socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit('sendMessage', { chatId, text: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GroupChat;
