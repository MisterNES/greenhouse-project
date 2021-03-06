import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from 'react';

function Hygrometer() {
  const {humidity, setHumidity} = useClimate();
  const [slowHumidity, setSlowHumidity] = useState(humidity);

  useEffect(() => {
    if(humidity === slowHumidity) return;

    const timer = setTimeout(() => {
      setSlowHumidity((prevState) => slowHumidity < humidity ? prevState + 1 : prevState - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [humidity, slowHumidity]);

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {slowHumidity}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => setHumidity(val)}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
