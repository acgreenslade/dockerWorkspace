import { useState } from "react";

const WEATHER_API_URI = "http://localhost:3000/api/weather";

export default function Weather() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    setError(null);

    try {
      const res = await fetch(WEATHER_API_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: Number(lat),
          lon: Number(lon)
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setWeather(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Weather</h2>

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
      <button onClick={submit}>Get Weather</button>

      {weather && (
        <div>
          <p>Temperature: {weather.temp} °F</p>
          <p>Feels like: {weather.feelsLike} °F</p>
          <p>Wind: {weather.windSpeed} mph</p>
          <p>Conditions: {weather.conditions}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
