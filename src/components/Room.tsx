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
  return (
    <Box
      sx={{
        px: 4,
        py: 4,
        color: 'white',
        backgroundColor: "black",
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
