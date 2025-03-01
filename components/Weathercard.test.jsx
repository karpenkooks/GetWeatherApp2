import { render, screen } from "@testing-library/react";
import Weathercard from "../components/Weathercard";
import '@testing-library/jest-dom';

describe("Weathercard component", () => {
    test("renders weather data correctly", () => {
        render(<Weathercard temperature="25" humidity="50" airPressure="1012" windSpeed="3" />);

        expect(screen.getByText("25°C")).toBeInTheDocument();
        expect(screen.getByText("Humidity: 50%")).toBeInTheDocument();
        expect(screen.getByText("Wind Speed: 3 m/s")).toBeInTheDocument();
        expect(screen.getByText("Air Pressure: 1012 hPa")).toBeInTheDocument();
    });

    test("renders different icons based on weather type", () => {
        const { rerender } = render(<Weathercard weatherCondition="sunny" />);
        expect(screen.getByTestId("weather-icon-main")).toHaveClass("weather-icon-main");

        rerender(<Weathercard weatherCondition="cloudy" />);
        expect(screen.getByTestId("weather-icon-main")).toHaveClass("weather-icon-main cloudy");
    });

    test("renders correct weather icon based on weather type", () => {
        const { rerender } = render(<Weathercard weatherCondition="sunny" />);
        expect(screen.getByTestId("weather-icon-main")).toHaveClass("weather-icon-main");
    
        rerender(<Weathercard weatherCondition="cloudy" />);
        expect(screen.getByTestId("weather-icon-main")).toHaveClass("weather-icon-main cloudy");
    
        rerender(<Weathercard weatherCondition="rainy" />);
        expect(screen.getByTestId("weather-icon-main")).toHaveClass("weather-icon-main cloudy");  // Оскільки у твоєму компоненті для інших умов встановлена така іконка
    });

});