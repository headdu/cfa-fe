import React from "react";
import { Box, Flex, Heading } from "rebass";
import CounterContext from "../CounterContext";
import Timer from "./Timer";
import TimerBuilder from "./TimerBuilder";
import Counter from "./Counter";

export default function Room() {
  const context = React.useContext(CounterContext);
  const [backgroundPct, setBackgroundPct] = React.useState<number | null>(null);
  const [inverseTimer, setInverseTimer] = React.useState(false);

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

  const [totalRounds, setTotalRounds] = React.useState<number>(0);
  const [round, setRound] = React.useState<number>(0);

  React.useEffect(() => {
    if (
      context.counterConfig &&
      context.counterConfig[context.currentStep] &&
      context.counterConfig[context.currentStep].type === "WORK"
    ) {
      setRound(round + 1);
    }
  }, [context.counterConfig, context.currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    let ttlRounds = 0;

    if (context.counterConfig) {
      ttlRounds = context.counterConfig.filter(
        (x: { type: string }) => x.type === "WORK"
      ).length;
    }
    setTotalRounds(ttlRounds);
    setRound(0);
  }, [context.counterConfig]);

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
          <>
            {currentTimer.type !== "COUNTDOWN" ? (
              <Counter totalRounds={totalRounds} rounds={round} />
            ) : null}
            <Timer
              key={currentTimer.label + context.currentStep}
              label={currentTimer.label}
              type={currentTimer.type}
              time={currentTimer.seconds / 1000}
              advance={context.advance}
              setBackgroundPct={setBackgroundPct}
              inverseTimer={inverseTimer}
              setInverseTimer={setInverseTimer}
            />
          </>
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
