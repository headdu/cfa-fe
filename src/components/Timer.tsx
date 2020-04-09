import React from "react";
import { sync } from "../api";
import { Flex } from "rebass";

const isToBeep = (actualSeconds: number, prevSeconds: number) => {
  return (
    Math.round(actualSeconds) > 0 &&
    Math.round(actualSeconds) <= 3 &&
    Math.round(prevSeconds) !== Math.round(actualSeconds)
  );
};

const getCountdownString = (timeLeft: number, inverseTimer: boolean) => {
  let countdownString = "";
  const minutes = Math.floor(Math.ceil(timeLeft) / 60);
  if (minutes) {
    if (minutes < 10) {
      countdownString += `0${minutes}:`;
    } else {
      countdownString += `${minutes}:`;
    }
  } else if (inverseTimer) {
    countdownString += '00:';
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

const setTimer = (
  time: number,
  setContent: (content: number) => void,
  type: string,
  setBackgroundPct: (pct: number) => void
) => {
  const start = Date.now();
  let prevContent = Number.MAX_SAFE_INTEGER;
  let interval: number;
  const clear = () => {
    if (interval) {
      clearInterval(interval);
    }
  };
  interval = setInterval(() => {
    const beepSound = document.getElementById("beep") as HTMLAudioElement;

    const playBeep = () => {
      if (beepSound) {
        beepSound.currentTime = 0;
        beepSound.play().catch((error) => {
          //safari browser sometimes throws a exception when play the sound (poop)
          //must catch it to not break anything!
          console.error(error);
        });
      }
    };

    let diff: number;
    diff = time - (Date.now() - start) / 1000;

    // get the number of seconds that have elapsed since
    // startTimer() was called

    // does the same job as parseInt truncates the float
    if (isToBeep(Math.ceil(diff), Math.ceil(prevContent))) {
      playBeep();
    }
    if (diff <= 0) {
      clear();
    }
    setContent(diff);
    prevContent = diff;
    setBackgroundPct(((diff - 1) * 100) / time);
  }, 50);

  return clear;
};

export default function Timer({
  label,
  time,
  advance,
  type,
  setBackgroundPct,
}: {
  label: string;
  time: number;
  advance: () => void;
  type: string;
  setBackgroundPct: (pct: number) => void;
}) {
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time);
  const [inverseTimer, setInverseTimer] = React.useState(false);

  React.useEffect(() => {
    setSynced(false);
    setContent(time);

    return setTimer(time, setContent, type, setBackgroundPct);
  }, [label, setBackgroundPct, time, type]);

  // we don't want to wait a full second before the timer starts

  React.useEffect(() => {
    if (content <= 0 && !synced) {
      setSynced(true);
      advance();
    }
  }, [advance, content, synced]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex="1"
      alignSelf="center"
      width="100%"
    >
      <h1 style={{ fontSize: "3rem" }}>{label}</h1>
      <Flex
        justifyContent="center"
        alignItems="center"
        flex="1"
        alignSelf="center"
        width="100%"
        style={{ position: "relative" }}
      >
        <h1 style={{ fontSize: "4rem" }}>
          {getCountdownString(inverseTimer ? time - content : content, inverseTimer)}
        </h1>
        {type === "REST" || type === "WORK" ? <img
          src={inverseTimer ? "./assets/sort-inverse.svg" : "./assets/sort.svg"}
          style={{ position: "absolute", right: 0, height: "2rem" }}
          onClick={() => setInverseTimer(!inverseTimer)}
        /> : null}
      </Flex>
    </Flex>
  );
}
