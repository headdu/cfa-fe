import * as React from "react";
import { Box, Flex, Button } from "rebass";
import { Input } from "@rebass/forms";
import { createRoom, joinRoom } from "../api";

export default function Home() {
  const [isJoining, setIsJoining] = React.useState(false);
  const [name, setName] = React.useState('')
  React.useEffect(() => {
    //load background image before show the image
    const backgroundImage = new Image();
    backgroundImage.src = "./assets/black.jpg";
    const backgroundElement = document.getElementById(
      "homeBackground"
    ) as HTMLElement;
    if (backgroundElement) {
      backgroundImage.onload = () => {
        backgroundElement.style.opacity = "1";
      };
    }
  }, []);

  const createRoomOnClick = () => {
    createRoom(name);
    (document.getElementById("beep") as HTMLAudioElement).load();
  };

  return (
    <Box
      id="homeBackground"
      sx={{
        px: 4,
        py: 6,
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        background: "grey url(./assets/black.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 1s",
        color: "white",
        width: "100%",
        flex: 1,
      }}
    >
      <img
        style={{ height: "30%", maxHeight: "30vh" }}
        src="./assets/logo.svg"
        alt={"Crossfit Aveiro"}
      ></img>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="My name"
        onChange={e => setName(e.target.value)}
        sx={{
          width: "60%",
          color: "white",
          marginBottom: 32,
          borderRadius: "20px",
          alignSelf: 'center'
        }}
      />
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
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              joinRoom((e.target as any)[0].value, name);
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
