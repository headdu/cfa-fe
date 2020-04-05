import React from "react";
import { Flex, Box, Heading } from "rebass";
import CounterContext from "../CounterContext";
import Timer from "./Timer";
import TimerBuilder from "./TimerBuilder";

export default function Room() {
  const context = React.useContext(CounterContext);

  const currentTimer =
    context.counterConfig && context.currentStep < context.counterConfig.length
      ? context.counterConfig[context.currentStep]
      : null;

  if (!currentTimer) {
    const backgroundBox = document.getElementById("background") as HTMLElement;
    if (backgroundBox) {
      backgroundBox.style.background = '';
      backgroundBox.style.backgroundImage = "url(./assets/cfakettlebell.jpg)";
      backgroundBox.style.backgroundSize = "cover";
      backgroundBox.style.backgroundPosition = "center";
    }
  }

  return (
    <Box
      id="background"
      sx={{
        px: 4,
        py: 4,
        color: "white",
        backgroundImage: "url(./assets/cfakettlebell.jpg)",
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
