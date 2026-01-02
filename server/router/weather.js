const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/weather", async (req, res) => {
  const { lat, lon } = req.body;

  if (lat == null || lon == null) {
    return res.status(400).json({ error: "lat and lon are required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}` +
      `&units=imperial` +
      `&appid=${process.env.OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json({
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      windSpeed: data.wind.speed,
      conditions: data.weather[0].main,
      units: {
        temp: "F",
        windSpeed: "mph"
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

module.exports = router;
