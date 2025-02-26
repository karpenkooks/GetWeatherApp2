import { useState } from "react";
import "./DateSwitch.css"; 

export default function DateSwitch({ selectedDate, setSelectedDate }) {
    return (
      <div className="date-switch">
        {["Today", "Tomorrow"].map((date) => (
          <button
            key={date}
            className={`date-button ${selectedDate === date ? "active" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>
    );
}