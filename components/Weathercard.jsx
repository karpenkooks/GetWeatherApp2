import React from "react";
import { WiDaySunny, WiCloud, WiHumidity, WiBarometer, WiStrongWind } from "react-icons/wi";
import "./Weathercard.css";

function Weathercard({
  temperature = "No data",
  humidity = "No data",
  airPressure = "No data",
  windSpeed = "No data",
  weatherCondition = "clear sky",  // Отримуємо пропс weatherCondition
}) {
  // Функція для вибору іконки та класу для зміни кольору
  const getWeatherIcon = (condition) => {
    if (condition === "clear sky" || condition === "sunny") {
      return <WiDaySunny className="weather-icon-main" data-testid="weather-icon-main" />;
    } else if (condition === "cloudy" || condition === "overcast") {
      return <WiCloud className="weather-icon-main cloudy" data-testid="weather-icon-main" />;
    } else {
      return <WiCloud className="weather-icon-main cloudy" data-testid="weather-icon-main" />;  // default іконка для інших випадків
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <p className="weather-item-main">{getWeatherIcon(weatherCondition)}</p>
        <p className="weather-item-main">{Math.round(temperature)}°C</p>
        <p className="weather-item"><WiHumidity className="weather-icon" /> Humidity: {humidity}%</p>
        <p className="weather-item"><WiStrongWind className="weather-icon" /> Wind Speed: {windSpeed} m/s</p>
        <p className="weather-item"><WiBarometer className="weather-icon" /> Air Pressure: {airPressure} hPa</p>
      </div>
    </div>
  );
}

export default Weathercard;