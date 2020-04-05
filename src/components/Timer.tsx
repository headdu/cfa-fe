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

const setTimer = (time: number, setContent: any, type: string) => {
  const start = Date.now();
  let prevContent = Number.MAX_SAFE_INTEGER;
  let interval = setInterval(() => {
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

    let diff: number;
    diff = time - (Date.now() - start) / 1000;

    // get the number of seconds that have elapsed since
    // startTimer() was called

    // does the same job as parseInt truncates the float
    if (isToBeep(Math.ceil(diff), Math.ceil(prevContent))) {
      playBeep();
    }
    if (diff <= 0) {
      clearInterval(interval);
    }
    setContent(diff);
    prevContent = diff;
    requestAnimationFrame(() => {
      const backgroundBox = document.getElementById(
        "background"
      ) as HTMLElement;
      backgroundBox.style.background = `linear-gradient(to top, ${
        type === "WORK" ? "green" : type === "REST" ? "red" : "blue"
      } ${((diff - 1) * 100) / time}%,transparent 100%)`;
    });
  }, 50);
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
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time);

  React.useEffect(() => {
    setSynced(false);
    setContent(time);
    setTimer(time, setContent, type);
  }, [label, time, type]);

  // we don't want to wait a full second before the timer starts

  React.useEffect(() => {
    if (isAdmin && Number.parseFloat(content.toFixed(1)) <= 0 && !synced) {
      setSynced(true);
      sync();
    }
  }, [isAdmin, content, synced]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <h1>{label}</h1>
      <h1>{getCountdownString(content)}</h1>
    </Flex>
  );
}
