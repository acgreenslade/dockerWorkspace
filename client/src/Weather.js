import { forwardRef, useImperativeHandle, useState } from "react";

const WEATHER_API_URI = "http://localhost:3000/api/weather";

const Weather = forwardRef((props, ref) => {
  const { lat, lon } = props;

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
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

  useImperativeHandle(ref, () => ({
    getWeather
  }));

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Weather</h2>

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
});

export default Weather;
