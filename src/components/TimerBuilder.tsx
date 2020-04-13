import React from "react";
import { Flex, Button, Box } from "rebass";
import { uuid } from "uuidv4";
import { setTabata, setRest, ConfigItem, setConfig } from "../api";
import TimerGroupCard from "./TimerGroupCard";

interface Group {
  work: string | number;
  rest: string | number;
  repeat: string;
  error?: boolean;
  hideField?: string;
  id: string
}

const buildConfig = (groups: Group[]): ConfigItem[] => {
  const config = [
    {
      label: "Countdown",
      seconds: 10000,
      type: "COUNTDOWN",
    },
  ];

  groups.forEach((g) => {
    const arrayToAdd = [];
    const timesToRepeat = Number.parseInt(g.repeat);

    if (g.work) {
      arrayToAdd.push({
        label: "GO! 🏋️",
        seconds: Number.parseInt(g.work as string) * 1000,
        type: "WORK",
      });
    }

    if (g.rest) {
      arrayToAdd.push({
        label: "REST! 😎",
        seconds: Number.parseInt(g.rest as string) * 1000,
        type: "REST",
      });
    }

    for (let i = 0; i < timesToRepeat; i++) {
      config.push(...arrayToAdd);
    }
  });

  return config;
};

export default function TimerBuilder({ ...props }) {
  const [groups, updateGroups] = React.useState<Group[]>([]);
  React.useEffect(() => {
    updateGroups([
      {
        work: "",
        rest: "",
        repeat: "1",
        error: false,
        hideField: "REST",
        id: uuid()
      },
    ]);
  }, [updateGroups]);

  const addGroup = () =>
    updateGroups([
      ...groups,
      {
        work: "",
        rest: "",
        repeat: "1",
        error: false,
        id: uuid(),
      },
    ]);

  const addWork = () =>
    updateGroups([
      ...groups,
      {
        work: "",
        rest: "",
        repeat: "1",
        error: false,
        hideField: "REST",
        id: uuid(),
      },
    ]);

  const addRest = () =>
    updateGroups([
      ...groups,
      {
        work: "",
        rest: "",
        repeat: "1",
        error: false,
        hideField: "WORK",
        id: uuid(),
      },
    ]);

  const updateSpecificGroup = (newGroup: any, idx: number) => {
    const verifiedNewGroup = {
      ...newGroup,
      error: !newGroup.work && !newGroup.rest,
    };

    updateGroups(
      groups.map((g, index) => (idx === index ? {...g, ...verifiedNewGroup} : g))
    );
  };

  const startCurrentConfig = () => {
    if (groups.every((g) => !g.error)) {
      setConfig(buildConfig(groups));
    }
  };

  const removeConfig = (index: number) => {
    updateGroups(groups.filter((g, idx) => index !== idx));
  };

  return (
    <Flex
      flexDirection="column"
      alignSelf="stretch"
      justifyContent="space-between"
      flex={1}
    >
      <Box>
        {groups.map((g, idx) => (
          <TimerGroupCard
            key={g.id}
            index={idx}
            {...g}
            updateGroup={updateSpecificGroup}
            removeConfig={groups.length > 1 ? removeConfig : undefined}
          />
        ))}
      </Box>
      <Box>
        <Flex justifyContent="space-between">
          <Button variant="secondary" width="30%" onClick={addWork} my={2}>
            Work
          </Button>
          <Button variant="secondary" width="30%" onClick={addRest} my={2}>
            Rest
          </Button>
          <Button variant="secondary" width="30%" onClick={addGroup} my={2}>
            Interval
          </Button>
        </Flex>

        <Button
          width="100%"
          variant="primary"
          onClick={startCurrentConfig}
          my={2}
        >
          Start
        </Button>
        <Flex justifyContent="space-between" alignSelf="stretch" my={2}>
          <Button onClick={setTabata}>Tabata</Button>
          <Button onClick={setRest}>1 min Rest</Button>
        </Flex>
      </Box>
    </Flex>
  );
}
