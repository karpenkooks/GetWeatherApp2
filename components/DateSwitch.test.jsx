import { render, screen, fireEvent } from "@testing-library/react";
import DateSwitch from "../components/DateSwitch";
import '@testing-library/jest-dom';

describe("DateSwitch component", () => {
    test("renders buttons correctly", () => {
        render(<DateSwitch selectedDate="Today" setSelectedDate={() => {}} />);

        expect(screen.getByText("Today")).toBeInTheDocument();
        expect(screen.getByText("Tomorrow")).toBeInTheDocument();
    });

    test("changes date when button is clicked", () => {
        const setSelectedDateMock = vi.fn();  // Використовуємо vi.fn() замість jest.fn()
        render(<DateSwitch selectedDate="Today" setSelectedDate={setSelectedDateMock} />);

        const tomorrowButton = screen.getByText("Tomorrow");
        fireEvent.click(tomorrowButton);

        expect(setSelectedDateMock).toHaveBeenCalledWith("Tomorrow");
    });
});