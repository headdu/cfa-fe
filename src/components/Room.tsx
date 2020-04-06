import React from "react";
import { Flex, Box, Heading } from "rebass";
import CounterContext from "../CounterContext";
import Timer from "./Timer";
import TimerBuilder from "./TimerBuilder";

export default function Room() {
  const context = React.useContext(CounterContext);
  const [backgroundPct, setBackgroundPct] = React.useState<number | null>(null);

  const currentTimer =
    context.counterConfig && context.currentStep < context.counterConfig.length
      ? context.counterConfig[context.currentStep]
      : null;

  let backgroundString = "none";
  if (backgroundPct && currentTimer) {
    const type = currentTimer.type;
    backgroundString = `linear-gradient(to top, ${
      type === "WORK" ? "green" : type === "REST" ? "red" : "blue"
    } ${backgroundPct}%,transparent 100%)`;
  } else {
    backgroundString = "url(./assets/cfakettlebell.jpg)";
  }

  return (
    <Box
      id="background"
      sx={{
        px: 4,
        py: 4,
        color: "white",
        background: backgroundString,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Heading textAlign="center" fontSize={[5, 6]} my={2}>
          Room id: {context.roomUuid}
        </Heading>
        {context.counterConfig && currentTimer ? (
          <Timer
            label={currentTimer.label}
            type={currentTimer.type}
            time={currentTimer.seconds / 1000}
            isAdmin={context.isAdmin}
            setBackgroundPct={setBackgroundPct}
          />
        ) : context.isAdmin ? (
          <>
            <TimerBuilder />
          </>
        ) : (
          <Heading>Waiting for Admin</Heading>
        )}
      </Flex>
    </Box>
  );
}
