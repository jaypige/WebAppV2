import io from 'socket.io-client';
import App from './App';


export const webSocket = io('http://localhost:3000');


export const setupSocket = () => {

    if(!webSocket.connected){

      webSocket.on('connect', () => {
        console.log('Connected to server');
      });
      
    }

    // webSocket.on('message', (data) => {

    //   const newData = {
    //     time: performance.now() / 1000,
    //     temp: parseInt(data.replace(/[\r\n]+/g, ''))
    //   };

      
    
    //   if (!isNaN(newData.temp)) {
    //     updateData(newData);
    //   }
    // });

    return () => {
      webSocket.disconnect();
    };
    
};