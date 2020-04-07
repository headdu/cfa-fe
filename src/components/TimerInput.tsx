import React, { HTMLProps } from "react";
import ReactDOM from 'react-dom'
import { Input } from "@rebass/forms";
import DurationTrack from "./DurationTrack";
import debounce from "lodash/fp/debounce";

interface TimerInputProps extends HTMLProps<HTMLInputElement> {
  onPickerChange: (e: number) => void;
}

// Array of numbers used to generate pickers
const numbers: number[] = [];
for (let i = 0; i < 61; i++) {
  numbers.push(i);
}

/**
 * Get human readable input value
 *
 * @param param: { minutes?: number; seconds?: number; }
 */
const getInputValue = ({
  minutes,
  seconds,
}: {
  minutes?: number;
  seconds?: number;
}) => {
  let value = "";
  if (minutes) {
    value = value + `${minutes} minutes`;
  }
  if (seconds) {
    value = value + `${minutes ? " " : ""}${seconds} seconds`;
  }
  return value;
};

export default function TimerInput({
  as,
  ref,
  onPickerChange,
  onChange,
  value,
  ...props
}: TimerInputProps) {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [minutes, setMinutes] = React.useState<number | undefined>(() =>
    value ? Math.floor(Number.parseInt(value as string)) / 60 : 0
  );
  const [seconds, setSeconds] = React.useState<number | undefined>(() =>
    value ? Number.parseInt(value as string) % 60 : 0
  );

  const debouncedPickerChange = debounce(250, onPickerChange);

  React.useEffect(() => {
    if (Number.isInteger(minutes as number) || Number.isInteger(seconds as number)) {
      const total = (minutes || 0) * 60 + (seconds || 0);
      debouncedPickerChange(total);
    }
  }, [debouncedPickerChange, minutes, seconds]);

  const inputValue = getInputValue({ minutes, seconds });
  return (
    <>
      <Input
        onFocus={() => setIsPickerOpen(true)}
        readOnly={true}
        value={inputValue}
        {...props}
      />
      {isPickerOpen
        ? ReactDOM.createPortal(
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onClick={() => setIsPickerOpen(false)}
              ></div>
              <div
                style={{
                  position: "fixed",
                  bottom: -256,
                  left: 0,
                  right: 0,
                  height: 256,
                  backgroundColor: "white",
                  display: "flex",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  
                }}
                className="animate-scroll-up"
              >
                <DurationTrack
                  qualifier={"Minutes"}
                  numbers={numbers}
                  value={minutes}
                  onChange={setMinutes}
                />
                <DurationTrack
                  qualifier={"Seconds"}
                  numbers={numbers}
                  value={seconds}
                  onChange={setSeconds}
                />
              </div>
            </>,
            document.getElementsByTagName('body')[0]
          )
        : null}
    </>
  );
}
