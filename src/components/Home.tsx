import React, { FormEvent } from "react";
import { Box, Heading, Flex, Button } from "rebass";
import { Input } from "@rebass/forms";
import { createRoom, joinRoom } from "../api";

export default function Home() {
  const [isJoining, setIsJoining] = React.useState(false);
  const createRoomOnClick = () => {
    createRoom();
    (document.getElementById("beep") as HTMLAudioElement).load();
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url(./assets/black.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        width: "100%",
        flex: 1,
      }}
    >
      <img
        style={{ height: "30%", maxHeight: "500px" }}
        src="./assets/logo.svg"
        alt={"Crossfit Aveiro"}
      ></img>

      {isJoining ? (
        <Flex flex={1} alignItems="center">
          <Button
            sx={{
              width: "7vh",
              height: "7vh",
              borderRadius: "50%",
              position: "absolute",
              top: "5%",
              left: "5%",
              backgroundImage: "url(./assets/arrow.svg)",
              backgroundPosition: "center",
              backgroundSize: "5vh 5vh",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => setIsJoining(false)}
          ></Button>
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
                  width: "60%",
                  color: "white",
                  marginBottom: 32,
                  borderRadius: "20px",
                }}
              />
              <Button
                type="submit"
                variant="primary"
                mr={1}
                sx={{ width: "60%", borderRadius: "20px" }}
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
            flexDirection: "column",
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
              sx={{ width: "100%", borderRadius: "20px" }}
              onClick={createRoomOnClick}
            >
              Create Timer
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
              sx={{ width: "100%", borderRadius: "20px" }}
            >
              Join Room
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
