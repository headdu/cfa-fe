let socket: WebSocket;

export const setBaseSocket = (newSocket: WebSocket) => {
  socket = newSocket;
};
ping()

export interface ConfigItem {
  label: string;
  seconds: number;
  type: string;
}

export function createRoom(name: string) {
  if (socket) {
    socket.send(JSON.stringify({ type: "create", name }));
  }
}

export function joinRoom(uuid: string, name: string) {
  if (socket) {
    socket.send(JSON.stringify({ type: "join", uuid, name }));
  }
}

export function setConfig(config: ConfigItem[]) {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "config",
        config,
      })
    );
  }
}

export function closeGroup() {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "closeGroup",
      })
    );
  }
}

export function updateLeaderboard(score: number) {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "updateLeaderboard",
        score
      })
    );
  }
}

export function clearLeaderboard() {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "clearLeaderboard",
      })
    );
  }
}

export function setTabata() {
  if (socket) {
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
}

export function setRest() {
  if (socket) {
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
}

export function sync(nextRound: number) {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "sync",
        round: nextRound,
      })
    );
  }
}

export function leaveRoom() {
  if (socket) {
    socket.send(
      JSON.stringify({
        type: "userLeaveGroup"
      })
    )
  }
}

export function ping() {
  setInterval(() => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      );
    }
  }, 5000);
}
