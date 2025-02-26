import React, { useEffect, useState } from "react";
import "./App.css";
import DateSwitch from "./components/DateSwitch";
import Weathercard from './components/Weathercard';


const API_KEY = "4cd0a8b7e02c12df3a659934535b8c32";


function App() {
    const [city, setCity] = useState("Kyiv");  
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState("Today");
  
    const fetchCoordinates = async (cityName, date) => {
        setLoading(true);
        setError("");
    
        try {
            const geoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
            );
            const geoData = await geoResponse.json();
    
            if (!geoData.length) {
                throw new Error("City not found!");
            }
    
            const { lat, lon } = geoData[0];
            fetchWeather(lat, lon, date); 
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setLoading(false);
        }
    };
  
    const fetchWeather = async (lat, lon, date) => {
        try {
            setLoading(true);
            setError("");
    
            if (date === "Today") {
                // Отримуємо поточну погоду
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
                );
                const weatherData = await weatherResponse.json();
    
                // Опис погоди
                const weatherCondition = weatherData.weather[0].description;
    
                setWeather({
                    temperature: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    airPressure: weatherData.main.pressure,
                    windSpeed: weatherData.wind.speed,
                    weatherCondition: weatherCondition, 
                });
    
            } else if (date === "Tomorrow") {
                // Отримуємо прогноз погоди на завтра
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
                );
                const forecastData = await forecastResponse.json();
    
             
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowDateString = tomorrow.toISOString().split("T")[0]; 
    
                const filteredData = forecastData.list.find(item =>
                    item.dt_txt.startsWith(tomorrowDateString) && item.dt_txt.includes("12:00:00")
                );
    
                if (filteredData) {
                    const weatherCondition = filteredData.weather[0].description; 
    
                    setWeather({
                        temperature: filteredData.main.temp,
                        humidity: filteredData.main.humidity,
                        airPressure: filteredData.main.pressure,
                        windSpeed: filteredData.wind.speed,
                        weatherCondition: weatherCondition, 
                    });
                } else {
                    setError("Weather data for tomorrow is not available.");
                }
            }
    
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch weather data.");
            setLoading(false);
        }
    };
  
    useEffect(() => {
        fetchCoordinates(city, selectedDate);
    }, [city, selectedDate]);
  
    return (
        <div className="container">
            <h1 className="title">Weather App</h1>
  
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="input-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="button" onClick={() => fetchCoordinates(city, selectedDate)}>
    Search
</button>
            </div>
  
            <DateSwitch selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
  
            {error && <p className="error-message">{error}</p>}
            {loading ? <p>Loading weather data...</p> : weather && <Weathercard {...weather} />}
        </div>
    );
  }
  
  export default App;