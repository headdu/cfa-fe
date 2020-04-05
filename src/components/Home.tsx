import React, { FormEvent } from "react";
import { Box, Heading, Flex, Button } from "rebass";
import { Input } from "@rebass/forms";
import { createRoom, joinRoom } from "../api";

export default function Home() {
  const [isJoining, setIsJoining] = React.useState(false);
  const createRoomOnClick = () => {
    createRoom();
    (document.getElementById("beep") as HTMLAudioElement).load();
  }

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
        flexDirection: "column",
      }}
    >
      <Heading textAlign="center" fontSize={[5, 6]}>
        WeTimer
      </Heading>

      {isJoining ? (
        <Flex flex={1} alignItems="center">
          <form
            style={{
              flex: 1,
            }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              joinRoom((e.target as any)[0].value);
              (document.getElementById("beep") as HTMLAudioElement).load();
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Input
                id="roomId"
                name="roomId"
                type="text"
                placeholder="Room Id"
                required
                sx={{
                  marginBottom: 32,
                }}
              />
              <Button
                type="submit"
                variant="primary"
                mr={1}
                sx={{ width: "60%" }}
              >
                Join Room
              </Button>
            </Flex>
          </form>
        </Flex>
      ) : (
        <Flex
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            px={2}
            py={2}
            width={1 / 2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="secondary"
              mr={1}
              sx={{ width: "60%" }}
              onClick={createRoomOnClick}
            >
              Create
            </Button>
          </Box>
          <Box
            px={2}
            py={2}
            width={1 / 2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="primary"
              mr={1}
              onClick={() => setIsJoining(true)}
              sx={{ width: "60%" }}
            >
              Join
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
