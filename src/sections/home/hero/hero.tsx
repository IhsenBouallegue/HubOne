"use client";

import { Container, Title, Text, Button, Group, Image } from "@mantine/core";

import classes from "./hero.module.css";

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              The{" "}
              <Text component="span" variant="gradient" inherit>
                central Hub
              </Text>{" "}
              for you and your team.
            </Title>

            <Text className={classes.description} mt={30}>
              Tired of keeping track of your most used websites? Tired of not
              finding that one super important link? Create you Hub and sync
              with your team.
            </Text>

            <Group>
              <Button
                variant="gradient"
                size="xl"
                mt={40}
                px={50}
                style={{ fontSize: 22 }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://hubone.vercel.app/"
              >
                Get Started
              </Button>
              <Button
                size="xl"
                variant="light"
                color="primary.4"
                mt={40}
                px={50}
                style={{ fontSize: 22 }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://hubone.vercel.app/"
              >
                Live Demo
              </Button>
            </Group>
          </div>
          <Image
            styles={{
              root: {
                position: "absolute",
                left: "60%",
                top: "20%",
                zIndex: -2,
                // boxShadow: theme.shadows.lg,
              },
            }}
            src="showcase-1.png"
            width={500}
            radius="md"
          />
          <Image
            styles={{
              root: {
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: -1,
                // boxShadow: theme.shadows.xl,
              },
            }}
            src="showcase-2.png"
            width={400}
            fit="contain"
            radius="md"
          />
        </div>
      </Container>
    </div>
  );
}
