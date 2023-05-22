import {
  Group,
  Switch,
  ActionIcon,
  MediaQuery,
  useMantineTheme,
  Button,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconSettings,
} from "@tabler/icons-react";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { useHubOneStore } from "@lib/Store";
import HubEditModal from "@modals/hub-modals/hub-edit-modal";

export function HeaderActionButtons() {
  const theme = useMantineTheme();

  const hub = useHubOneStore((state) => state.hub);
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);
  const setCompactMode = useHubOneStore((state) => state.setCompactMode);

  const [editModalOpened, setEditModalOpened] = useState(false);

  return (
    <Group>
      <Switch
        checked={compactMode}
        onChange={(event) => setCompactMode(event.target.checked)}
        onLabel={
          <IconArrowsMaximize size="1.2rem" stroke={2.5} color={theme.white} />
        }
        offLabel={
          <IconArrowsMinimize
            size="1.2rem"
            stroke={2.5}
            color={theme.colors.primary[4]}
          />
        }
        size="lg"
        styles={{
          track: {
            background: theme.colors.primary[0],
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
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <ScrollLink to="linkSection" smooth="easeInOutQuint" duration={1000}>
            <Button
              variant="gradient"
              gradient={{
                from: theme.colors.primary[4],
                to: theme.colors.secondary[4],
              }}
              sx={{ height: 30 }}
            >
              Browse Links
            </Button>
          </ScrollLink>
        </MediaQuery>
      )}
      {hub.id && (
        <HubEditModal opened={editModalOpened} setOpened={setEditModalOpened} />
      )}
    </Group>
  );
}
