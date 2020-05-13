import * as React from "react";
import { updateLeaderboard } from "../api";
import { Flex, Text } from "rebass";

export default function RepCounter() {
  const [reps, setReps] = React.useState(0);

  const countRep = () => {
    setReps(reps + 1);
    updateLeaderboard(reps + 1);
  };

  return (
  
      <Flex
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          border: "1px solid white",
          borderRadius: 8,
        }}
        flexDirection="column"
        alignItems="center"
        onClick={countRep}
        py={3}
      >
        <Text fontSize={[3]}>Count Rep!</Text>
        <Text fontSize={[1]}>Current Number Of Reps: {reps}</Text>
      </Flex>
  );
}
