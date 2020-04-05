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
        context.setCounterConfig(parsedMessage.config);
        context.setCurrentStep(0);
        break;
      case "closeGroup":
        leaveRoom();
        break;
      case "sync":
        context.setCurrentStep(context.currentStep + 1);
        break;
    }
  };

  const leaveRoom = () => {
    context.setRoomUuid("");
    context.setAdmin(false);
    context.setCurrentStep(0);
    context.setCounterConfig(null);
  };

  React.useEffect(() => {
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", leaveRoom);

    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", leaveRoom);
    };
  });

  return null;
}
