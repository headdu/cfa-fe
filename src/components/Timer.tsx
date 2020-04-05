import React, { Component } from "react";
import { sync } from "../api";
import { Flex } from "rebass";

export default function Timer({
  label,
  time,
  isAdmin,
  type
}: {
  label: string;
  time: number;
  isAdmin: boolean;
  type: string
}) {
  const [start, setStart] = React.useState(Date.now() + 1000);
  const [synced, setSynced] = React.useState(false);
  const [content, setContent] = React.useState(time + 1);
  const beepSound = document.getElementById("beep") as HTMLAudioElement;
  const backgroundBox = document.getElementById("background") as HTMLElement;

  const isToBeep = (actualSeconds: number) => {
    return (
      Math.round(actualSeconds) > 0 &&
      Math.round(actualSeconds) <= 3 &&
      Math.round(content) !== Math.round(actualSeconds)
    );
  };

  const playBeep = () => {
    if (beepSound) {
      beepSound.load();
      beepSound.play().catch((error) => {
        //safari browser sometimes throws a exception when play the sound (poop)
        //must catch it to not break anything!
        console.error(error);
      });
    }
  };

  React.useEffect(() => {
    setStart(Date.now());
    setSynced(false);
    return () => {
      backgroundBox.style.backgroundImage= "url(./assets/cfakettlebell.jpg)";
      backgroundBox.style.backgroundSize= "cover";
      backgroundBox.style.backgroundPosition= "center";
    }
  }, [label, time]);

  // we don't want to wait a full second before the timer starts

  React.useEffect(() => {
    let diff: number, seconds;
    diff = time - (Date.now() - start) / 1000;
    if (Number.parseFloat(diff.toFixed(1)) > 0.5) {
      setTimeout(() => {
        // get the number of seconds that have elapsed since
        // startTimer() was called

        // does the same job as parseInt truncates the float
        seconds = diff % 60;
        if (isToBeep(seconds)) {
          playBeep();
        }
        setContent(seconds);
      }, 50);
    } else if (!synced && isAdmin) {
      setSynced(true);
      sync();
    }
    backgroundBox.style.background = `linear-gradient(to top, ${
      type === "WORK" ? "green" : type=== "REST" ? "red" : "blue"
    } ${((content - 1) * 100) / time}%,transparent 100%)`;
  }, [time, start, isAdmin, content, synced]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <h1>{label}</h1>
      <h1>{Math.round(content)}</h1>
    </Flex>
  );
}
