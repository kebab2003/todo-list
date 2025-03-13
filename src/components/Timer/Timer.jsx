import './Timer.css';

function CountdownTimer({ timeLeft }) {
  const displayMinutes = Math.max(0, Math.floor(timeLeft / 60));
  const displaySeconds = Math.max(0, timeLeft % 60);

  return (
    <span className="timer">
      {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
    </span>
  );
}

export default CountdownTimer;
