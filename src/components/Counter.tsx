import React from "react";
import { sync } from "../api";
import { Flex } from "rebass";

const getCountdownString = (timeLeft: number) => {
  let countdownString = "";
  const minutes = Math.floor(Math.ceil(timeLeft) / 60);
  if (minutes) {
    if (minutes < 10) {
      countdownString = countdownString + `0${minutes}:`;
    } else {
      countdownString = countdownString + `${minutes}:`;
    }
  }

  const seconds = Math.round(Math.ceil(timeLeft) % 60);

  if (seconds !== 60) {
    if (seconds < 10) {
      countdownString = countdownString + `0${seconds}`;
    } else {
      countdownString = countdownString + seconds;
    }
  } else {
    countdownString = countdownString + "00";
  }

  return countdownString;
};

export default function Counter({
  totalRounds,
  rounds,
  time,
}: {
  totalRounds: number;
  rounds:number;
  time: number;
}) {
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time);

  React.useEffect(() => {
    setSynced(false);
    setContent(time);
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = time - (Date.now() - start) / 1000;
      if (diff <= 0) {
        clearInterval(interval);
      }
      setContent(diff);
    }, 50);
  },[time]);

  return (
    <Flex
      flexDirection="column"
      flex="1"
      alignSelf="flex-end"
      justifyContent="center"
      alignItems="start"
    >
      <div style={{ fontSize: '1.5rem', paddingBottom:'.2rem' }}>Time: {getCountdownString(content)}</div>
      <div style={{ fontSize: '1.5rem' }}>{rounds} of {totalRounds} rounds </div>
    </Flex>
  );
}
