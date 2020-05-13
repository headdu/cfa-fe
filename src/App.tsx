import * as React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";
import "./App.css";
import CounterContext from "./CounterContext";
import ConnectionManager from "./ConnectionManager";
import Home from "./components/Home";
import Room from "./components/Room";
import { Box } from "rebass";
import { ConfigItem, sync, setConfig } from "./api";
import Warning from "./components/Warning";
import packageJson from "../package.json";
import { useClearCache } from "react-clear-cache";

function App() {
  const [roomUuid, setRoomUuid] = React.useState("");
  const [counterConfig, setCounterConfig] = React.useState<
    ConfigItem[] | undefined
  >(undefined);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAdmin, setAdmin] = React.useState(false);
  const [warning, setWarningMessage] = React.useState('');
  const [onWarningClick, setOnWarningClick] = React.useState(() => () => {})
  const [timeUpdate, setTimeUpdate] = React.useState<number | undefined>(undefined)
  const { isLatestVersion, emptyCacheStorage, latestVersion } = useClearCache();
  const [leaderboard, setLeaderboard] = React.useState<{name: string, score: number}[]>([])

  React.useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage(latestVersion)
    }
  }, [emptyCacheStorage, isLatestVersion, latestVersion])

  const setWarning = (message: string, onNewWarningClick?: () => void) => {
    setWarningMessage(message);
    if (onNewWarningClick) {
      setOnWarningClick(() => onNewWarningClick)
    }
  }

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
        setConfig([]);
      } else {
        setCurrentStep(nextRound);
      }
      if (isAdmin) {
        sync(nextRound);
      }
    }

    if (timeUpdate) {
      setTimeUpdate(undefined)
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
          warning,
          onWarningClick,
          setWarning,
          timeUpdate,
          setTimeUpdate,
          leaderboard,
          setLeaderboard
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
          <span style={{position: 'absolute', bottom: 16, left:16, fontSize: 11}}>{packageJson.version}</span>
        </Box>
        <Warning />
      </CounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
