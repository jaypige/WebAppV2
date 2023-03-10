import io from 'socket.io-client';
import App from './App';

export const receiveOnSocket = (socket, commandStateRef, feedbackStateRef, setChartUpdate) => {

  socket.on('message', (data) => {
    if(data[0] == 'r'){
      data = data.substring(1);

      if(data[0] == 'f'){
        commandStateRef.current.firstTemp = data.substring(1);      
      }
      if(data[0] == 's'){
        commandStateRef.current.secondTemp = data.substring(1);      
      }

      if(data[0] == 't'){
        commandStateRef.current.thirdTemp = data.substring(1);      
      }

      if(data[0] == 'm'){
        commandStateRef.current.motorSpeed = data.substring(1);
      }
  }

    if(data[0] == 'y'){

      data = data.substring(1);

      if(data[0] == 'f'){
        feedbackStateRef.current.firstTemp = data.substring(1);
      }
      if(data[0] == 's'){
        feedbackStateRef.current.secondTemp = data.substring(1);
      }
      if(data[0] == 't'){
        feedbackStateRef.current.thirdTemp = data.substring(1);
      }
      if(data[0] == 'm'){
        feedbackStateRef.current.motorSpeed = data.substring(1);
        setChartUpdate(true);
        console.log("motor speed feedback!");
        console.log(feedbackStateRef.current.motorSpeed);
      }
    }
    });


};






