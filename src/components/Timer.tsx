import React from "react";
import { sync } from "../api";
import { Flex } from "rebass";



const isToBeep = (actualSeconds: number) => {
  return [3, 2, 1].includes(actualSeconds);
};

const getCountdownString = (timeLeft: number) => {
  let countdownString = "";
  const minutes = Math.floor(timeLeft / 60);
  if (minutes) {
    if (minutes < 10) {
      countdownString = countdownString + `0${minutes}:`
    } else {
      countdownString = countdownString + `${minutes}:`
    }
  }

  const seconds = Math.round(timeLeft % 60);

  if (seconds !== 60) {
    if (seconds < 10) {
      countdownString = countdownString + `0${seconds}`;
    } else {
      countdownString = countdownString + seconds;
    }
  } else {
    countdownString = countdownString + '00'
  }

  return countdownString;
};

export default function Timer({
  label,
  time,
  isAdmin,
}: {
  label: string;
  time: number;
  isAdmin: boolean;
}) {
  const [startDate, setStart] = React.useState<any>(null);
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time);

  React.useEffect(() => {
    setStart(null);
    setSynced(false);
    setContent(time);
  }, [label, time]);

  // we don't want to wait a full second before the timer starts

  React.useEffect(() => {
    const newContent = content - 1
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
    if (content > 0) {
      setTimeout(() => {
        // get the number of seconds that have elapsed since
        // startTimer() was called

        // does the same job as parseInt truncates the float
        if (isToBeep(newContent)) {
          playBeep();
        }
        setContent(newContent);
      }, 999);
    } else if (!synced && isAdmin) {
      setSynced(true);
      sync();
    }
  }, [time, startDate, isAdmin, content, synced]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <h1>{label}</h1>
      <h1>{getCountdownString(content)}</h1>
    </Flex>
  );
}
