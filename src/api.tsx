const socket = new WebSocket("wss://cf-aveiro.herokuapp.com");

export function createRoom() {
  socket.send(JSON.stringify({ type: "create" }));
}

export function joinRoom(uuid: string) {
  socket.send(JSON.stringify({type: 'join', uuid}))
}

export function setTabata() {
  
  socket.send(
    JSON.stringify({
      type: "config",
      config: [
        {
          label: "Countdown",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        },
        {
          label: "GO!",
          seconds: 20000
        },
        {
          label: "Rest",
          seconds: 10000
        }
      ]
    })
  );
}

export function setRest() {
  socket.send(JSON.stringify({
    type: 'config',
    config: [
      {
        label: 'Rest',
        seconds: 60000
      }
    ]
  }))
}

export function sync() {
  socket.send(JSON.stringify({
    type: 'sync'
  }))
}

export default socket