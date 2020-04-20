import React from "react";
import CounterContext from "./CounterContext";
import socket from "./api";

export default function ConnectionManager() {
  const context = React.useContext(CounterContext);

  const handleMessage = (message: MessageEvent) => {
    const parsedMessage = JSON.parse(message.data);

    switch (parsedMessage.type) {
      case "createSuccess":
        context.setRoomUuid(parsedMessage.uuid);
        context.setAdmin(true);
        break;
      case "joinSuccess":
        context.setRoomUuid(parsedMessage.uuid);
        break;
      case "config":
        context.resetConfig();
        context.setCounterConfig(parsedMessage.config);
        break;
      case "closeGroup":
        context.setWarning(
          "Admin left the room. Click here to leave this room",
          leaveRoom
        );
        break;
      case "sync":
        if (parsedMessage.round === 0) {
          context.resetConfig();
        } else if (parsedMessage.round && parsedMessage.round > context.currentStep) {
          context.setCurrentStep(parsedMessage.round);
        }
        break;
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

  React.useEffect(() => {
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", displayWarning);

    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", displayWarning);
    };
  });

  return null;
}
