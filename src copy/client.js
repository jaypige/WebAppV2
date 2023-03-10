import './App.css';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const startTime = performance.now()
const [time, setTime] = useState(((performance.now() - startTime)/1000).toFixed(2));
const [serialData, setSerialData] = useState([]); 
const dataRef = useRef([]);
const timeRef = useRef(0);


const [serialChart, setSerialChart] = useState({
    labels: serialData.map((data) => data.time),
    datasets: [
      {
        label: "Temperature",
        data: serialData.map((data) => data.temp),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  });
  const chartRef = useRef(null);


useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {

      setTime(((performance.now()) / 1000).toFixed(2));
      timeRef.current = time;
      console.log(timeRef.current)
      const newData = { time: 0, temp: parseInt(data.replace(/[\r\n]+/g, '')) };

      if(!isNaN(newData.temp)){
        setSerialData(serialData => [...serialData, newData]);
        dataRef.current = [...dataRef.current, newData];
        const newChart = {
          labels: dataRef.current.map((data) => data.time),
          datasets: [
            {
              label: "Temperature",
              data: dataRef.current.map((data) => data.temp),
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
            },
          ],
        };
        
          setSerialChart(newChart);
          console.log(serialChart)
          chartRef.current = serialChart;
          console.log("serialData");
          console.log(chartRef);
          console.log(dataRef)
      }
    });
    return () => {
        socket.disconnect();
    };
    
}, []);