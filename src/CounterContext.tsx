import React from 'react'
import { ConfigItem } from './api';

interface CounterContextProps {
  roomUuid: string;
  setRoomUuid: (uuid: string) => void;
  counterConfig?: ConfigItem[];
  setCounterConfig: (config?: ConfigItem[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isAdmin: boolean;
  setAdmin: (bool: boolean) => void;
  resetConfig: () => void;
  advance: () => void;
  warning: string;
  onWarningClick: () => void;
  setWarning: (warning: string, onWarningClick?: () => void) => void;
}

const CounterContext = React.createContext<CounterContextProps>({
  roomUuid: "",
  setRoomUuid: (uuid: string) => {},
  counterConfig: undefined,
  setCounterConfig: (config: any) => {},
  currentStep: 0,
  setCurrentStep: (step: number) => {},
  isAdmin: false,
  setAdmin: (bool: boolean) => {},
  resetConfig: () => {},
  advance: () => {},
  warning: '',
  onWarningClick: () => {},
  setWarning: (warning: string) => {},
});

export default CounterContext
