import { useEffect, useState } from "react";
import "./Zen-mode.css";
import React from 'react';
export default function ZenMode() {
  const [, setMainHeight] = useState("100vh");
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const navHeight = navbar.offsetHeight;
      setMainHeight(`calc(100vh - ${navHeight}px)`);
    }
  }, []);

  // State for input values
  const [workingHoursInputValue, setWorkingHoursInputValue] = useState(2);
  const [workingMinutesInputValue, setWorkingMinutesInputValue] = useState(0);

  const [workingHours] = useState(2);

  const [breakDuration, setBreakDuration] = useState(5);
  const [breakEnabled, setBreakEnabled] = useState(false);
  const [remainingBreakTime, setRemainingBreakTime] = useState(breakDuration * 60); // in seconds
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [remainingFocusTime, setRemainingFocusTime] = useState(workingHours * 60 * 60); // in seconds
  const [focusTimeBeforeBreak, setFocusTimeBeforeBreak] = useState(null);

  useEffect(() => {
    let timer;
    if (focusEnabled && remainingFocusTime > 0) {
      timer = setInterval(() => {
        setRemainingFocusTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [focusEnabled, remainingFocusTime]);

  useEffect(() => {
    let timer;
    if (breakEnabled && remainingBreakTime > 0) {
      timer = setInterval(() => {
        setRemainingBreakTime((prevTime) => prevTime - 1);
      }, 1000);
      if (focusEnabled) {
        setFocusTimeBeforeBreak(remainingFocusTime);
        setFocusEnabled(false);
      }
    } else if (!breakEnabled && focusTimeBeforeBreak !== null) {
      setRemainingFocusTime(focusTimeBeforeBreak);
      setFocusEnabled(true);
      setFocusTimeBeforeBreak(null);
    }
    return () => clearInterval(timer);
  }, [breakEnabled, remainingBreakTime]);

  const handleWorkingHoursChange = (e) => {
    const hours = parseInt(e.target.value);
    setWorkingHoursInputValue(hours);
    setRemainingFocusTime(hours * 60 * 60 + workingMinutesInputValue * 60);
  };

  const handleWorkingMinutesChange = (e) => {
    const minutes = parseInt(e.target.value);
    setWorkingMinutesInputValue(minutes);
    setRemainingFocusTime(workingHoursInputValue * 60 * 60 + minutes * 60);
  };

  const handleBreakDurationChange = (e) => {
    setBreakDuration(parseInt(e.target.value));
    setRemainingBreakTime(parseInt(e.target.value) * 60);
  };

  const startBreak = () => {
    setBreakEnabled(true);
  };

  const startFocus = () => {
    setFocusEnabled(true);
    setBreakEnabled(false);
    setRemainingBreakTime(breakDuration * 60);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
      <div data-testid="zen1" className="zen-manager">
        <h1 className="title">Zen Mode configuration</h1>

            <div className="settings">
              <div className="setting">
                <label>
                  Working Hours:
                  <input
                      data-testid="working-hours-input"
                      type="number"
                      value={workingHoursInputValue}
                      onChange={handleWorkingHoursChange}
                  />
                </label>
                <label>
                  Working Minutes:
                  <input
                      data-testid="working-minutes-input"
                      type="number"
                      value={workingMinutesInputValue}
                      onChange={handleWorkingMinutesChange}
                  />
                </label>
              </div>
              <div className="setting">
                <label>
                  Break Duration (minutes):
                  <input
                      type="number"
                      value={breakDuration}
                      onChange={handleBreakDurationChange}
                  />
                </label>
              </div>
              <div className="setting">
                {focusEnabled ? (
                    <>
                      <p className="enabled">Focus Enabled</p>
                      <p data-testid="working-time-output" className="time">{formatTime(remainingFocusTime)}</p>
                    </>
                ) : (
                    <button onClick={startFocus}>Start Focus</button>
                )}
              </div>
              <div className="setting">
                {breakEnabled ? (
                    <>
                      <p className="enabled">Break Enabled</p>
                      <p className="time">{formatTime(remainingBreakTime)}</p>
                    </>
                ) : (
                    <button onClick={startBreak}>Start Break</button>
                )}
              </div>
            </div>

      </div>
  );
}

