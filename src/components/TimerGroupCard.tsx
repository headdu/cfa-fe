import * as React from "react";
import { Card, Box, Button } from "rebass";
import TimerInput from "./TimerInput";
import { Label, Input } from "@rebass/forms";

interface TimerGroupCardProps {
  work: number | string;
  rest: number | string;
  repeat: string;
  index: number;
  error?: boolean;
  updateGroup: (group: any, idx: number) => void;
  removeConfig?: (idx: number) => void;
  hideField?: string;
}

export default function TimerGroupCard({
  work,
  rest,
  repeat,
  index,
  updateGroup,
  removeConfig,
  hideField,
  error,
}: TimerGroupCardProps) {
  const onChangeWork = (val: number) => {
    if (val !== work) {
      updateGroup(
        {
          work: val,
          rest,
          repeat,
        },
        index
      );
    }
  };

  const onChangeRest = (val: number) => {
    if (val !== rest) {
      updateGroup(
        {
          work,
          rest: val,
          repeat,
        },
        index
      );
    }
  };

  const onChangeRepeat = (val: React.ChangeEvent<HTMLInputElement>) => {
    updateGroup(
      {
        work,
        rest,
        repeat: val.target.value,
      },
      index
    );
  };

  return (
    <Card
      my={3}
      px={2}
      sx={{
        borderRadius: 4,
        color: "black",
        position: "relative",
        border: "1px solid",
        borderColor: error ? "red" : "transparent",
      }}
    >
      {removeConfig ? (
        <Button
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translate(50%, -50%)",
            borderRadius: "50%",
            height: 32,
            width: 32,
            padding: 0,
            textAlign: "center",
          }}
          onClick={() => removeConfig(index)}
          variant="primary"
        >
          X
        </Button>
      ) : null}
      {hideField !== "WORK" ? (
        <Box my={1}>
          <Label htmlFor={`work-${index}`}>Time to work</Label>
          <TimerInput
            id={`work-${index}`}
            name={`work-${index}`}
            value={work}
            onPickerChange={onChangeWork}
            placeholder={"Time to work"}
          />
        </Box>
      ) : null}
      {hideField !== "REST" ? (
        <Box my={1}>
          <Label htmlFor={`rest-${index}`}>Time to rest:</Label>
          <TimerInput
            id={`rest-${index}`}
            name={`rest-${index}`}
            value={rest}
            onPickerChange={onChangeRest}
            placeholder={"Time to rest"}
          />
        </Box>
      ) : null}
      {!hideField ? (
        <Box my={1}>
          <Label htmlFor="repeat">Times to repeat:</Label>
          <Input
            id="repeat"
            name="repeat"
            type="number"
            value={repeat}
            placeholder="Times to repeat"
            onChange={onChangeRepeat}
            min={1}
          />
        </Box>
      ) : null}
    </Card>
  );
}
