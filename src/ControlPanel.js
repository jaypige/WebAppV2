import React, { useState, useEffect } from 'react';
import './ControlPanel.css'; // import the CSS file for styling
import './App.js';
import moment from 'moment';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureFull } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



function ControlPanel(props) {

const handleSliderChange = (event,newValue,id) => {
    if(id=='slider1'){
      props.setSettings({
        ...props.settings,
        firstTemp: newValue,
      })
    }
    if(id=='slider2'){
      props.setSettings({
        ...props.settings,
        secondTemp: newValue,
      })
    }
    if(id=='slider3'){
      props.setSettings({
        ...props.settings,
        thirdTemp: newValue,
      })
    }
    if(id=='slider4'){
      props.setSettings({
        ...props.settings,
        motorSpeed: newValue,
      })

    }

  }

const handleCommitted = (event) => {
  console.log("handled");
  props.setCommit(true);
  props.onCommitChange(props.commit); 
};




const [enable, setEnable] = useState(0);
const [direction, setDirection] = useState(0);


const valuetext = (value)=>{
  return `${value}°C`;
}
return (
  <div className="control-panel" onMouseUp={handleCommitted}>
  <h2 className='timer'>{moment.utc(moment.duration(moment().diff(props.startTime)).asMilliseconds()).format('HH:mm:ss')}</h2>

        <p style={{marginBottom:"0%"}}>{props.feedbackState.current.firstTemp}°C/{props.settings.firstTemp}°C</p>
        <Box sx={{ width: 300 }} style={{display:"flex", flexDirection:"row"}}>
        <FontAwesomeIcon icon={faTemperatureFull} style={{marginRight:'10%', color:"rgba(255, 99, 132,1)"}}/>
      <Slider

        onChange={(event, value) => handleSliderChange(event, value, 'slider1')}

        value={props.settings.firstTemp}
        valueLabelDisplay="auto"
        step={1}
        // marks
        min={1}
        max={400}
      />
    </Box>
    <p style={{marginBottom:"0%"}}>{props.feedbackState.current.secondTemp}°C/{props.settings.secondTemp}°C</p>
    <Box sx={{ width: 300 }} style={{display:"flex", flexDirection:"row",color:"rgba(85, 214, 190,1)"}}>

        <FontAwesomeIcon icon={faTemperatureFull} style={{marginRight:'10%'}}/>
      <Slider
        onChange={(event, value) => handleSliderChange(event, value, 'slider2')}
        value={props.settings.secondTemp}

        valueLabelDisplay="auto"
        step={1}
      
        min={20}
        max={400}
      />
    </Box>
    <p style={{marginBottom:"0%"}}>{props.feedbackState.current.thirdTemp}°C/{props.settings.thirdTemp}°C</p>
    <Box sx={{ width: 300}} style={{display:"flex", flexDirection:"row"}}>
        <FontAwesomeIcon icon={faTemperatureFull} style={{marginRight:'10%', color:"rgba(31, 32, 65,1)"}}/>
      <Slider
        onChange={(event, value) => handleSliderChange(event, value, 'slider3')}
        valueLabelDisplay="auto"
        step={1}
        // marks
        min={20}
        max={400}
      />
    </Box>
    <p style={{marginBottom:"0%"}}>{props.feedbackState.current.motorSpeed}/{props.settings.motorSpeed}</p>
    <Box sx={{ width: 300 }}  style={{display:"flex", flexDirection:"row"}}>
    <FontAwesomeIcon icon={faGauge} style={{marginRight:'10%'}}/>
      <Slider
        onChange={(event, value) => handleSliderChange(event, value, 'slider4')}

        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={100}
      />
    </Box>
    <div style={{fontSize:"3rem", marginTop:"20%", cursor:"pointer"}}>
    {/* <FontAwesomeIcon icon={faStop} size={"10em"} style={{marginRight:'10%', color:'red', opacity:"0.8"}}/> */}
    </div>
    <div>
    <FormControlLabel
          value="bottom"
          control={<Switch onChange={()=>{setEnable(!enable)}} defaultUnchecked />
        }
          label="Enable"
          labelPlacement="bottom"
        />
            <FormControlLabel
          value="bottom"
          control={<Switch onChange={()=>setDirection(!direction)}
          defaultUnchecked />
        }
          label="Direction"
          labelPlacement="bottom"
        />
    </div>
  </div>
);
}
export default ControlPanel;
