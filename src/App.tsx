import React from "react";
import logo from "./logo.svg";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import "./App.css";
import CounterContext from "./CounterContext";
import ConnectionManager from "./ConnectionManager";
import Home from "./components/Home";
import Room from "./components/Room";
import { Box } from "rebass";
import { ConfigItem, sync } from "./api";

function App() {
  const [roomUuid, setRoomUuid] = React.useState("");
  const [counterConfig, setCounterConfig] = React.useState<
    ConfigItem[] | undefined
  >(undefined);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAdmin, setAdmin] = React.useState(false);

  /**
   * Reset current config and round
   */
  const resetConfig = () => {
    setCurrentStep(0);
    setCounterConfig(undefined);
  };

  /**
   * Advance to next round
   * If no next round available, reset config
   * If admin, send sync message with next round
   */
  const advance = () => {
    if (counterConfig) {
      const nextRound =
        currentStep < counterConfig.length - 1 ? currentStep + 1 : 0;
      if (nextRound === 0) {
        resetConfig();
      } else {
        setCurrentStep(nextRound);
      }
      if (isAdmin) {
        sync(nextRound);
      }
    }
  };

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
          resetConfig,
          advance,
        }}
      >
        <ConnectionManager />
        <Box
          sx={{
            bg: "white",
            color: "black",
            height: "100%",
            background: roomUuid
              ? "black url(./assets/logo.svg) no-repeat center"
              : "black",
            backgroundSize: "80%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {roomUuid ? <Room /> : <Home />}
          <audio
            id="beep"
            src="./assets/beep.wav"
            controls
            style={{ display: "none" }}
          />
          <span style={{position: 'absolute', bottom: 16, left:16, fontSize: 11}}>V.0.0.3</span>
        </Box>
      </CounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
