import { useEffect, useState } from "react";
import "./Zen-mode.css";

export default function ZenMode() {
  const [mainHeight, setMainHeight] = useState("100vh");
  useEffect(() => {
    const navHeight = document.querySelector(".navbar").offsetHeight;
    setMainHeight(`calc(100vh - ${navHeight}px)`);
  }, []);
  const [focusMode, setFocusMode] = useState(false);
  const [workingHours, setWorkingHours] = useState(8);
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
        setFocusTimeBeforeBreak(remainingFocusTime); // Store remaining focus time before the break starts
        setFocusEnabled(false); // Pause focus time when break starts
      }
    } else if (!breakEnabled && focusTimeBeforeBreak !== null) {
      setRemainingFocusTime(focusTimeBeforeBreak); // Restore remaining focus time when break ends
      setFocusEnabled(true); // Resume focus time when break ends
      setFocusTimeBeforeBreak(null); // Reset stored focus time before break
    }
    return () => clearInterval(timer);
  }, [breakEnabled, remainingBreakTime]);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    setFocusEnabled(false); // Reset focus mode when toggling
    setFocusTimeBeforeBreak(null); // Reset stored focus time before break
    setRemainingFocusTime(workingHours * 60 * 60); // Reset focus time
  };

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(parseInt(e.target.value));
    setRemainingFocusTime(parseInt(e.target.value) * 60 * 60); // Reset focus time when working hours change
  };

  const handleBreakDurationChange = (e) => {
    setBreakDuration(parseInt(e.target.value));
    setRemainingBreakTime(parseInt(e.target.value) * 60); // Reset break time when break duration changes
  };

  const startBreak = () => {
    setBreakEnabled(true);
  };

  const startFocus = () => {
    setFocusEnabled(true);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
      <div className="zen-manager">
        <h1>Study Management</h1>
        <label>
          <input type="checkbox" checked={focusMode} onChange={toggleFocusMode} />
          Enable Focus Mode
        </label>
        {focusMode && (
            <div className="settings">
              <div className="setting">
                <label>
                  Working Hours:
                  <input type="number" value={workingHours} onChange={handleWorkingHoursChange} />
                </label>
              </div>
              <div className="setting">
                <label>
                  Break Duration (minutes):
                  <input type="number" value={breakDuration} onChange={handleBreakDurationChange} />
                </label>
              </div>
              <div className="setting">
                {focusEnabled ? (
                    <>
                      <p>Focus Enabled</p>
                      <p>Remaining Focus Time: {formatTime(remainingFocusTime)}</p>
                    </>
                ) : (
                    <button onClick={startFocus}>Start Focus</button>
                )}
              </div>
              <div className="setting">
                {breakEnabled ? (
                    <>
                      <p>Break Enabled</p>
                      <p>Remaining Break Time: {formatTime(remainingBreakTime)}</p>
                    </>
                ) : (
                    <button onClick={startBreak}>Start Break</button>
                )}
              </div>
            </div>
        )}
      </div>
  );

}

