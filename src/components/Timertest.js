<div className="app" style={{ backgroundColor: backgroundColor }}>
  <div>
    <Navbar />
    <main className="main">
      <div className="line-under-navbar"></div>
      {/* Timer */}
      <div className="timer-box">
        <div className="timer">
          <div className="timer__menu">
            <TimerMenuBtn
              text={"Pomodoro"}
              time={25}
              bgc={"rgb(186, 73, 73)"}
              handleTimerChange={handleTimerChange}
            />
            <TimerMenuBtn
              text={"Short Break"}
              time={5}
              bgc={"rgb(56, 133, 138)"}
              handleTimerChange={handleTimerChange}
            />
            <TimerMenuBtn
              text={"Long Break"}
              time={10}
              bgc={"rgb(57, 112, 151)"}
              handleTimerChange={handleTimerChange}
            />
          </div>
          {/* Licznik */}
          <TimerDisplay
            key={currentTime}
            timeInMinutes={currentTime}
            isTimerRunning={isTimerRunning}
          />

          <div className="timer__buttons">
            {/* Start - Pause button */}
            <button
              className={`timer__button--start ${isTimerRunning ? "timer__button--start-active" : ""}`}
              onClick={handleStartClick}
              style={{ color: backgroundColor }}
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>

            {/* Jeśli Timer pracuje wyświetl przycisk przejścia */}
            {isTimerRunning ? (
              <button className="timer__button--next" onClick={handleNextClick}>
                <img src="icons/next-white3.png" alt="next arrow icon" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <Checklist backgroundColor={backgroundColor} />
    </main>
    <Settings />
  </div>
</div>;
