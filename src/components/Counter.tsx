import React from "react";
import { Flex } from "rebass";

export default function Counter({
  totalRounds,
  rounds,
}: {
  totalRounds: number;
  rounds:number;
}) {

  return (
    <Flex
      flexDirection="column"
      flex="1"
      alignSelf="center"
      justifyContent="center"
      alignItems="start"
    >
      <div style={{ fontSize: '3rem' }}>{rounds} of {totalRounds} rounds </div>
    </Flex>
  );
}
