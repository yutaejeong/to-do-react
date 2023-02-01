import { useState } from "react";

export function useTimer() {
  const [time, setTime] = useState<number>(0);
  const [onGoing, setOnGoing] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer | undefined>(
    undefined
  );

  const stopTimer = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    }
    setOnGoing(false);
  };

  const startTimer = () => {
    stopTimer();
    setIntervalID(
      setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000)
    );
    setOnGoing(true);
  };

  return { onGoing, time, startTimer, stopTimer };
}
