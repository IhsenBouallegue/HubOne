"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";

import { IconArchive, IconBook, IconUsers } from "@tabler/icons-react";
import Image from "next/image";
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
                styles={{ label: { fontSize: 22 } }}
              >
                Get Started
              </Button>
              <Button
                size="xl"
                variant="light"
                color="primary.4"
                mt={40}
                px={50}
                styles={{ label: { fontSize: 22 } }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://public.huboneapp.com/"
              >
                Live Demo
              </Button>
            </Group>
          </div>
          <div
            className={classes.bluredLinkCard}
            style={{ right: "15%", rotate: "6deg", scale: "0.8" }}
          >
            <div style={{ height: "40%", display: "flex" }}>
              <IconUsers
                width={64}
                height={64}
                color="#333333"
                style={{ margin: "auto" }}
              />
            </div>

            <Text fw={800} size="xl">
              Onboarding
            </Text>
            <Text size="sm">
              A document containing all about onboarding new team members.
            </Text>
          </div>
          <div
            className={classes.bluredLinkCard}
            style={{ right: "35%", top: "56%", rotate: "-6deg", scale: "0.9" }}
          >
            <div style={{ height: "40%", display: "flex" }}>
              <IconArchive
                width={64}
                height={64}
                color="#333333"
                style={{ margin: "auto" }}
              />
            </div>
            <Text fw={800} size="xl">
              Documentation
            </Text>
            <Text size="sm">
              Our public documentation website for internal and external users.
            </Text>
          </div>
          <div
            className={classes.bluredLinkCard}
            style={{ right: "25%", top: "40%" }}
          >
            <div style={{ height: "40%", display: "flex" }}>
              <IconBook
                width={64}
                height={64}
                color="#333333"
                style={{ margin: "auto" }}
              />
            </div>
            <Text fw={800} size="xl">
              Tutorials
            </Text>
            <Text size="sm">
              A collection to of tutorials for the most used tools in our
              compony.
            </Text>
          </div>
          <Image
            src="/circle-scatter-red.svg"
            fill
            alt="background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              filter: "blur(60px)",
            }}
          />
          <Image
            src="/circle-scatter-yellow.svg"
            fill
            alt="background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              filter: "blur(60px)",
            }}
          />
        </div>
      </Container>
    </div>
  );
}
