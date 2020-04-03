import React from 'react'

const CounterContext = React.createContext<any>({
  roomUuid: "",
  setRoomUuid: (uuid: string) => {},
  counterConfig: null,
  setCounterConfig: (config: any) => {},
  currentStep: 0,
  setCurrentStep: (step: number) => {},
  isAdmin: false,
  setAdmin: (bool: boolean) => {}
});

export default CounterContext
