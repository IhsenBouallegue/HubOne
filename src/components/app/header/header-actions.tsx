"use client";

import { useHubOneStore } from "@lib/Store";
import {
  ActionIcon,
  Button,
  Group,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import HubEditModal from "@modals/hub-modals/hub-edit-modal";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

export function HeaderActionButtons() {
  const theme = useMantineTheme();

  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);
  const setCompactMode = useHubOneStore((state) => state.setCompactMode);

  const [editModalOpened, setEditModalOpened] = useState(false);

  return (
    <Group>
      <Switch
        checked={compactMode}
        aria-label="Enable compact mode"
        onChange={(event) => setCompactMode(event.target.checked)}
        onLabel={
          <IconArrowsMaximize size={20} stroke={2.5} color={theme.white} />
        }
        offLabel={
          <IconArrowsMinimize
            size={20}
            stroke={2.5}
            color={theme.colors.primary[4]}
          />
        }
        size="lg"
        styles={{
          track: {
            ...(compactMode ? {} : { background: theme.colors.primary[0] }),
            borderWidth: 0,
          },
        }}
      />
      {editMode ? (
        <Group ml="auto" mr="12px">
          <ActionIcon
            variant="light"
            color="primary"
            onClick={() => setEditModalOpened(true)}
          >
            <IconSettings />
          </ActionIcon>
        </Group>
      ) : (
        <Group hiddenFrom="sm">
          <ScrollLink to="linkSection" smooth="easeInOutQuint" duration={1000}>
            <Button
              variant="gradient"
              gradient={{
                from: theme.colors.primary[4],
                to: theme.colors.secondary[4],
              }}
              style={{ height: 30 }}
            >
              Browse Links
            </Button>
          </ScrollLink>
        </Group>
      )}
      <HubEditModal opened={editModalOpened} setOpened={setEditModalOpened} />
    </Group>
  );
}
