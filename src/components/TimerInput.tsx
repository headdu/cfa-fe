import React, { HTMLProps } from "react";
import ReactDOM from "react-dom";
import { Input, Label } from "@rebass/forms";
import debounce from "lodash/fp/debounce";
import { Flex } from "rebass";

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
  const [minutes, setMinutes] = React.useState<number>(() =>
    value ? Math.floor(Number.parseInt(value as string)) / 60 : 0
  );
  const [seconds, setSeconds] = React.useState<number>(() =>
    value ? Number.parseInt(value as string) % 60 : 0
  );

  const debouncedPickerChange = debounce(250, onPickerChange);

  React.useEffect(() => {
    if (
      Number.isInteger(minutes as number) ||
      Number.isInteger(seconds as number)
    ) {
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
                onClick={() => {
                  if (
                    minutes >= 0 &&
                    minutes <= 60 &&
                    seconds >= 0 &&
                    seconds <= 60
                  ) {
                    setIsPickerOpen(false);
                  }
                }}
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
                <Flex
                  flex={1}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  mx={3}
                >
                  <Label htmlFor={`track-minutes`}>Number of Minutes</Label>
                  <Input
                    id={"track-minutes"}
                    sx={{
                      height: 40,
                      alignSelf: "center",
                    }}
                    value={minutes}
                    type="number"
                    min="0"
                    max="60"
                    placeholder={"Number of Minutes"}
                    onChange={(e) =>
                      setMinutes(Number.parseInt(e.currentTarget.value))
                    }
                  />
                </Flex>
                <Flex
                  flex={1}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  mx={3}
                >
                  <Label htmlFor={`track-seconds`}>Number of Seconds</Label>
                  <Input
                    id={"track-seconds"}
                    sx={{
                      height: 40,
                      alignSelf: "center",
                    }}
                    value={seconds}
                    type="number"
                    min="0"
                    max="60"
                    placeholder={"Number of Seconds"}
                    onChange={(e) =>
                      setSeconds(Number.parseInt(e.currentTarget.value))
                    }
                  />
                </Flex>
              </div>
            </>,
            document.getElementsByTagName("body")[0]
          )
        : null}
    </>
  );
}
