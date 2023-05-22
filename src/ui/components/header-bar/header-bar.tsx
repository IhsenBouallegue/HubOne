import { Burger, Collapse, Group, Paper } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { HeaderActionButtons } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { HeaderLogo } from "./header-logo";

export function Header() {
  const [opened, toggleOpened] = useToggle();

  return (
    <Paper
      px="xl"
      py="md"
      m="sm"
      shadow="medium"
      radius="lg"
      mih="4rem"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Group position="apart" w="100%">
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            sx={(theme) => ({
              [theme.fn.largerThan("sm")]: {
                display: "none",
              },
            })}
          />
          <HeaderLogo />
        </Group>
        <Group
          spacing="lg"
          pos="absolute"
          left="50%"
          sx={(theme) => ({
            transform: "translate(-50%, 0)",
            [theme.fn.smallerThan("sm")]: {
              display: "none",
            },
          })}
        >
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
        <HeaderActionButtons />
      </Group>
      <Collapse in={opened}>
        <Group spacing="md" mt="sm">
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
      </Collapse>
    </Paper>
  );
}

export default Header;
