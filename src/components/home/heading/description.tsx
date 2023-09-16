"use client";

import { Text } from "@mantine/core";
import type { ReactNode } from "react";

export function Description({ children }: { children: ReactNode }) {
  return (
    <Text
      c="dimmed"
      ta="center"
      style={(theme) => ({
        maxWidth: 600,
        "&::after": {
          content: '""',
          display: "block",
          backgroundColor: theme.colors.primary[4],
          width: 45,
          height: 2,
          marginTop: theme.spacing.sm,
          marginLeft: "auto",
          marginRight: "auto",
        },
      })}
    >
      {children}
    </Text>
  );
}
