import './App.css';
import LineChart from './Graph.js';
import { useState, useEffect, useRef } from 'react';
import { setupSocket, webSocket} from './setUpSocket.js';
import {sendOnSocket} from './sendOnSocket.js'
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import ControlPanel from './ControlPanel';
import { receiveOnSocket } from './ReceiveFromSocket';


function App() {
  const dataRef = useRef([]);
  useEffect(() => {
    document.title = 'Space Matters Web-App';
  }, []);
  const commandStateRef = useRef({
    firstTemp: 0,
    secondTemp: 0,
    thirdTemp: 0,
    motorSpeed: 0,
  },[]);
  const feedbackStateRef = useRef({
    firstTemp: 0,
    secondTemp: 0,
    thirdTemp: 0,
    motorSpeed: 0,
  },[]);

  const chartRef = useRef(null);
  const [chartUpdate, setChartUpdate] = useState(false);

  const [commit, setCommit] = useState(false);
  const [commandState, setCommandState] = useState({
    firstTemp: 0,
    secondTemp: 0,
    thirdTemp: 0,
    motorSpeed: 0,
  },[]);
  const [feedbackState, setFeedbackState] = useState({
    firstTemp: 0,
    secondTemp: 0,
    thirdTemp: 0,
    motorSpeed: 0,
  },[]);

  const [settings, setSettings] = useState({
    firstTemp: 0,
    secondTemp: 0,
    thirdTemp: 0,
    motorSpeed: 0,
  },[]);


  const [start, setStart] = useState(false)
  const [startTime, setStartTime] = useState(moment())

  
  const handleSettingsChange = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  const handleSend = () => {
    sendOnSocket(webSocket,('f'+ settings.firstTemp).toString()+'x');
    sendOnSocket(webSocket,('s'+settings.secondTemp).toString()+'x');
    sendOnSocket(webSocket,('t'+settings.thirdTemp).toString()+'x');
    sendOnSocket(webSocket,('m' + settings.motorSpeed).toString()+'x');
    setCommit(false);
  };  

  const [date, setDate] = useState(moment().format('hh:mm:ss'));

  const [data, setData] = useState(
  {
    labels: [],
    datasets: [
      {
        label: 'First stage',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132,0.8)',
        borderColor: 'rgba(255, 99, 132,0.8)',
        borderWidth: 2,

      },
      {
        label: 'Second Stage',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(85, 214, 190,0.8)',
        borderColor: 'rgba(85, 214, 190,0.8)',
        borderWidth: 2,


      },
      {
        label: 'Third Stage',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(31, 32, 65,0.8)',
        borderColor: 'rgba(31, 32, 65,0.8)',
        borderWidth: 2,
      },
      {
        label: 'First Stage Command',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132,0.5)',
        borderColor: 'rgba(255, 99, 132,0.5)',
        borderWidth: 2,
        borderDash: [10, 10],

      },
      {
        label: 'Second Stage Command',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(85, 214, 190,0.5)',
        borderColor: 'rgba(85, 214, 190,0.5)',
        borderWidth: 2,
        borderDash: [10, 10],      },
      {
        label: 'Third Stage Command',
        data: [],
        pointRadius: 0,
        fill: false,
        backgroundColor: 'rgba(31, 32, 65,0.5)',
        borderColor: 'rgba(31, 32, 65,0.5)',
        borderWidth: 2,
        borderDash: [10, 10],
      },
    ],
  });

  receiveOnSocket(webSocket, commandStateRef, feedbackStateRef,setChartUpdate);

  useEffect(() => {
    if(chartUpdate){
    setDate(moment().format('hh:mm:ss'));
    chartRef.current.data.labels.push(date);
    chartRef.current.data.datasets[0].data.push(feedbackStateRef.current.firstTemp);
    chartRef.current.data.datasets[1].data.push(feedbackStateRef.current.secondTemp);
    chartRef.current.data.datasets[2].data.push(feedbackStateRef.current.thirdTemp);
    chartRef.current.data.datasets[3].data.push(commandStateRef.current.firstTemp);
    chartRef.current.data.datasets[4].data.push(commandStateRef.current.secondTemp);
    chartRef.current.data.datasets[5].data.push(commandStateRef.current.thirdTemp);

    if(chartRef.current.data.labels.length>30){
      chartRef.current.data.labels.shift();
      chartRef.current.data.datasets.forEach(dataset => {
        if (dataset.data.length > 0) {
          dataset.data.shift();
        }     
       });
    }
    chartRef.current.update();
    console.log(chartRef.current.data);
    }
    setChartUpdate(false);
}, [chartUpdate]);

  const options = {
    animation: false,
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Temperatures'
        },
        legend:{
          display: false,
        },
    },
    scales: {
        x: {
            display: true,
            min:0,
            max:100,
            grid:{
              display:false,

            },
            ticks:{
              display:false
            }
        },
        y: {
            display: true,
            max:450,
        }
    }
};
  useEffect(() => {
    const cleanup = setupSocket();
    return cleanup;
  }, []);
  return (
    <div className="App">
      <h1>Space Matters</h1>
      <h3>Extruder Web Interface</h3>
      <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
        <ControlPanel settings={settings} onSettingsChange={handleSettingsChange} onCommitChange={handleSend}  commit={commit} setCommit={setCommit} setSettings={setSettings} feedbackState={feedbackStateRef} startTime={startTime}/>
        <div className='line-wrapper'>
          <Line options={options} ref={chartRef} data={data} />
        </div>
      </div>
    </div>   
  );
}
export default App;
