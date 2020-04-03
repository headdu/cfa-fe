import React from 'react'
import CounterContext from './CounterContext'
import socket from './api'

export default function ConnectionManager() {
  const context = React.useContext(CounterContext)
  console.log(context)

  const handleMessage = (message: MessageEvent) => {
    const parsedMessage = JSON.parse(message.data)
    console.log(parsedMessage);
    switch(parsedMessage.type) {
      case 'createSuccess':
        context.setRoomUuid(parsedMessage.uuid)
        context.setAdmin(true)
        break
      case 'joinSuccess':
        context.setRoomUuid(parsedMessage.uuid)
        break
      case 'config':
        context.setCounterConfig(parsedMessage.config)
        context.setCurrentStep(0)
        break
      case 'sync':
        context.setCurrentStep(context.currentStep + 1)
        break
    }
  }

  React.useEffect(() => {
    socket.addEventListener('message', handleMessage)

    return () => socket.removeEventListener('message', handleMessage)
  })

  return null
}