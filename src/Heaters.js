import logo from './logo.svg';
import './Heaters.css';

function Heaters() {
  return (
    <div className='input-wrapper'>
    <div className='temp-input'>
        <input placeholder='Set first stage temp'></input>
        <input placeholder='Set second stage temp'></input>
        <input placeholder='Set third stage temp'></input>
    </div>
    <div className='motor-input'>
    <input placeholder='Set motor speed'></input>
    </div>
</div>
  );
}

export default Heaters;
