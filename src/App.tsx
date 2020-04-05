import React from "react";
import logo from "./logo.svg";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import "./App.css";
import CounterContext from "./CounterContext";
import ConnectionManager from "./ConnectionManager";
import Home from "./components/Home";
import Room from "./components/Room";
import { Box } from "rebass";
import { url } from "inspector";

function App() {
  const [roomUuid, setRoomUuid] = React.useState("");
  const [counterConfig, setCounterConfig] = React.useState<any[] | null>(null);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAdmin, setAdmin] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CounterContext.Provider
        value={{
          roomUuid,
          setRoomUuid,
          counterConfig,
          setCounterConfig,
          currentStep,
          setCurrentStep,
          isAdmin,
          setAdmin,
        }}
      >
        <ConnectionManager />
        <Box
          sx={{
            bg: "white",
            color: "black",
            height: "100%",
            background: "url(./assets/logo.svg) no-repeat center",
            backgroundSize: "80%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {roomUuid ? <Room /> : <Home />}
          <audio
            id="beep"
            src="./assets/beep.mp3"
            controls
            style={{ display: "none" }}
          />
        </Box>
      </CounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
