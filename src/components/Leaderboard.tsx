import * as React from "react";
import CounterContext from "../CounterContext";
import { Text, Flex, Card } from "rebass";

export default function Leaderboard() {
  const context = React.useContext(CounterContext);

  return (
    <Card
      my={3}
      px={2}
      sx={{
        borderRadius: 4,
        color: "black",
        position: "relative",
        border: "1px solid",
        borderColor: "transparent",
        alignSelf: "stretch",
      }}
    >
      <Flex alignItems="center" flexDirection={"column"}>
        <Text fontSize={[3]} my={3} fontWeight="bold" color="black">
          Leaderboard
        </Text>
        {!context.leaderboard.length ? (
          <Text fontSize={[1]} fontWeight="bold" color="black">
            No results on leaderboard yet!<br/>
            Count your rounds to compete with others!
          </Text>
        ) : null}
        <ol style={{padding: 0, alignSelf: 'stretch'}}>
          {[...context.leaderboard].sort((a, b) => b.score - a.score).map((item) => (
            <Flex justifyContent="space-between">
              <Text fontSize={[3]} fontWeight="bold" color="black">
                {item.name}
              </Text>
              <Text fontSize={[3]} fontWeight="bold" color="black">
                {item.score}
              </Text>
            </Flex>
          ))}
        </ol>
      </Flex>
    </Card>
  );
}
