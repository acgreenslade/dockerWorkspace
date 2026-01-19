import React, { useRef, useState } from "react";
import Weather from "./Weather";

const API_URI = "http://localhost:3000/api/items";

export default function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const weatherRef = useRef();

  const handleClick = () => {
    if (weatherRef.current) {
      weatherRef.current.getWeather();
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Running Logistics</h1>
      <p>Enter coordinates:</p>
      <input
        placeholder="Latitude"
        value={lat}
        onChange={e => setLat(e.target.value)}
      />
      <input
        placeholder="Longitude"
        value={lon}
        onChange={e => setLon(e.target.value)}
      />
      <button onClick={handleClick}>Get Recommendation</button>
      <Weather lat={lat} lon={lon} ref={weatherRef}/>
    </div>
  );
}
