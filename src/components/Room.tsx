import React from "react";
import { Flex, Button, Box } from "rebass";
import CounterContext from "../CounterContext";
import Timer from "./Timer";
import { setTabata, setRest } from "../api";

export default function Room() {
  const context = React.useContext(CounterContext);

  const currentTimer =
    context.counterConfig && context.currentStep < context.counterConfig.length
      ? context.counterConfig[context.currentStep]
      : null;
  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        backgroundImage: "url(https://source.unsplash.com/random/1024x768?sky)",
        backgroundSize: "cover",
        color: "white",
        bg: "gray",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Flex 
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column">
        <p>Room id: {context.roomUuid}</p>
        {context.counterConfig && currentTimer ? (
          <Timer
            label={currentTimer.label}
            time={currentTimer.seconds / 1000}
            isAdmin={context.isAdmin}
          />
        ) : (
          "Waiting for Admin"
        )}
        {context.isAdmin ? (
          <Flex justifyContent="space-between" alignSelf="stretch">
            <Button onClick={setTabata}>Start Tabata</Button>
            <Button onClick={setRest}>Start Rest</Button>
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
}
