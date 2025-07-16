interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <p className="mb-4 font-semibold bg-secondary border border-warning rounded-full px-5 py-3 inline-block">
      {timeLeft}
    </p>
  );
};

export default Timer;
