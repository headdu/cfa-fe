import * as React from "react";
import CounterContext from "./CounterContext";
import { setBaseSocket } from "./api";

export default function ConnectionManager() {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const [myUuid, setMyUuid] = React.useState<string | null>(null);
  const context = React.useContext(CounterContext);

  React.useEffect(() => {
    if (!socket) {
      let url = "wss://cf-aveiro.herokuapp.com"; // "ws://localhost:8080";  //
      const uuidToUse = localStorage.getItem('conUuid') || myUuid
      if (uuidToUse) {
        url += "?uuid=" + uuidToUse;
      }
      var ws = new WebSocket(url);

      ws.onopen = function () {
        if (context.warning) {
          context.setWarning("", () => null);
        }
        if (context.counterConfig) {
          ws.send(
            JSON.stringify({
              type: "resyncAfterAdminReconnect",
              config: context.counterConfig,
              currentRound: context.currentStep
            })
          );
        }
        (window as any).mySocket = ws
      };

      ws.onclose = function (e) {
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
          e.reason
        );
        setTimeout(function () {
          setSocket(null);
        }, 1000);
      };

      ws.onerror = function (err) {
        console.error("Socket encountered error: ", err, "Closing socket");
        ws.close();
      };
      setSocket(ws)
      setBaseSocket(ws)
    }
  }, [socket, myUuid, context]);

  React.useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      const parsedMessage = JSON.parse(message.data);

      switch (parsedMessage.type) {
        case "createSuccess":
          context.setRoomUuid(parsedMessage.uuid);
          context.setAdmin(true);
          break;
        case "assumeLeadershipSuccess":
          context.setRoomUuid(parsedMessage.uuid);
          context.setAdmin(true);
          break;
        case "joinSuccess":
          context.setRoomUuid(parsedMessage.uuid);
          break;
        case "config":
          context.resetConfig();
          context.setCounterConfig(parsedMessage.config);
          context.setCurrentStep(0)
          break;
        case "closeGroup":
          if (!context.isAdmin) {
            context.setWarning(
              "Admin left the room. Click here to leave this room",
              leaveRoom
            );
          } else {
            context.setRoomUuid('')
          }
          break;
        case "myId":
          setMyUuid(parsedMessage.uuid);
          localStorage.setItem("conUuid", parsedMessage.uuid);
          break;
        case "sync":
          if (parsedMessage.round === 0) {
            context.resetConfig();
          } else if (
            parsedMessage.round &&
            parsedMessage.round > context.currentStep
          ) {
            context.setCurrentStep(parsedMessage.round);
          }
          break;
        case "syncExistingConfig":
          context.setCounterConfig(parsedMessage.config);
          context.setCurrentStep(parsedMessage.round);

          const timeDifference = parsedMessage.currentDate - Date.now();
          const date = parsedMessage.lastSyncDate + timeDifference
          
          context.setTimeUpdate(date);
          break;
        case "currentLeaderboard":
          context.setLeaderboard(parsedMessage.leaderboard)
          break
      }
    };

    const leaveRoom = () => {
      context.setRoomUuid("");
      context.setAdmin(false);
      context.setCurrentStep(0);
      context.setCounterConfig(undefined);
      context.setWarning("", () => null);
    };

    const displayWarning = () => {
      context.setWarning(
        "Connection lost. Click here to return to homepage",
        () => window.location.reload(false)
      );
    };

    if (socket) {
      socket.addEventListener("message", handleMessage);
      socket.addEventListener("close", displayWarning);

      return () => {
        socket.removeEventListener("message", handleMessage);
        socket.removeEventListener("close", displayWarning);
      };
    }
  }, [socket, context]);

  return null;
}
