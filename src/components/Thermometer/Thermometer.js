import ReactSlider from "react-slider";
import './Thermometer.css';
import {useClimate} from '../../context/ClimateContext'
import { useEffect, useState } from 'react';


function Thermometer() {
  let state = true;
  const {temp, setTemp} = useClimate();

  const [slowTemp, setSlowTemp] = useState(temp);

  useEffect(()=>{

    if(state){
      setTimeout(()=>{
        setSlowTemp((prevState)=> prevState < temp ? prevState + 1 : prevState - 1)
      },1000);
    }

    if (slowTemp === temp){
      return (state=false);
    }

  },[slowTemp])

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {slowTemp}°F</div>
      <ReactSlider
        value={temp}
        onAfterChange={(val) => setTemp(val)}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
