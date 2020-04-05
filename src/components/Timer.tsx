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

export default function Timer({
  label,
  time,
  isAdmin,
  type,
}: {
  label: string;
  time: number;
  isAdmin: boolean;
  type: string;
}) {
  const [startDate, setStart] = React.useState<any>(null);
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time);
  const backgroundBox = document.getElementById("background") as HTMLElement;

  React.useEffect(() => {
    setStart(null);
    setSynced(false);
    setContent(time);
  }, [
    label,
    time,
  ]);

  // we don't want to wait a full second before the timer starts

  React.useEffect(() => {
    const beepSound = document.getElementById("beep") as HTMLAudioElement;

    const playBeep = () => {
      if (beepSound) {
        beepSound.load();
        beepSound.currentTime = 0;
        beepSound.play().catch((error) => {
          //safari browser sometimes throws a exception when play the sound (poop)
          //must catch it to not break anything!
          console.error(error);
        });
      }
    };

    const start = startDate || Date.now();
    if (!startDate) {
      setStart(start);
    }

    let diff: number;
    diff = time - (Date.now() - start) / 1000;

    if (Number.parseFloat(diff.toFixed(1)) > 0) {
      setTimeout(() => {
        // get the number of seconds that have elapsed since
        // startTimer() was called

        // does the same job as parseInt truncates the float
        if (isToBeep(Math.ceil(diff), Math.ceil(content))) {
          playBeep();
        }
        setContent(diff);
        backgroundBox.style.background = `linear-gradient(to top, ${
          type === "WORK" ? "green" : type === "REST" ? "red" : "blue"
        } ${((diff - 1) * 100) / time}%,transparent 100%)`;
      }, 50);
    } else if (!synced && isAdmin) {
      setSynced(true);
      sync();
    }
  }, [
    time,
    startDate,
    isAdmin,
    content,
    synced,
    backgroundBox.style.background,
    type,
    backgroundBox.style.backgroundColor,
  ]);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" flex="1" alignSelf="center">
      <h1 style={{fontSize:'3rem'}} >{label}</h1>
      <h1 style={{fontSize:'4rem'}} >{getCountdownString(content)}</h1>
    </Flex>
  );
}
