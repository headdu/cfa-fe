export const apiUrl = "wss://cf-aveiro.herokuapp.com";
const socket = new WebSocket(apiUrl);

export interface ConfigItem {
  label: string;
  seconds: number;
  type: string;
}

export function createRoom() {
  socket.send(JSON.stringify({ type: "create" }));
}

export function joinRoom(uuid: string) {
  socket.send(JSON.stringify({ type: "join", uuid }));
}

export function setConfig(config: ConfigItem[]) {
  socket.send(
    JSON.stringify({
      type: "config",
      config,
    })
  );
}

export function setTabata() {
  socket.send(
    JSON.stringify({
      type: "config",
      config: [
        {
          label: "Countdown",
          seconds: 10000,
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
        {
          label: "GO!",
          seconds: 20000,
          type: "WORK",
        },
        {
          label: "Rest",
          seconds: 10000,
          type: "REST",
        },
      ],
    })
  );
}

export function setRest() {
  socket.send(
    JSON.stringify({
      type: "config",
      config: [
        {
          label: "Rest",
          seconds: 60000,
          type: "REST",
        },
      ],
    })
  );
}

export function sync(nextRound: number) {
  socket.send(
    JSON.stringify({
      type: "sync",
      round: nextRound
    })
  );
}

export function ping() {
  setInterval(() => {
    if (socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      );
    }
  }, 5000);
}

socket.addEventListener("open", ping);

export default socket;
