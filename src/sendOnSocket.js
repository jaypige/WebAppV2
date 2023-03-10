import io from 'socket.io-client';
import App from './App';

export const sendOnSocket = (socket,message) => {
    socket.emit('message', message);
};