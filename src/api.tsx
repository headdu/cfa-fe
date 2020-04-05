const socket = new WebSocket("wss://cf-aveiro.herokuapp.com");

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
      config
    })
    )
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
          type: "REST"
        },
      ],
    })
  );
}

export function sync() {
  socket.send(
    JSON.stringify({
      type: "sync",
    })
  );
}

export function ping() {
  setInterval(() => {
    socket.send(
      JSON.stringify({
        type: "ping",
      })
    );
  }, 5000);
}

socket.addEventListener("open", ping);

export default socket;
