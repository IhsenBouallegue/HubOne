import type {
  MantineThemeOverride,
  Tuple,
  DefaultMantineColor,
} from "@mantine/core";

const theme: MantineThemeOverride = {
  colors: {
    primary: [
      "#fff2e3",
      "#ffbf71",
      "#ffbf71",
      "#ffa639",
      "#ff8d00",
      "#c66d00",
      "#8e4e00",
      "#552f00",
      "#1c1000",
    ],
    secondary: [
      "#ffe9e3",
      "#ffbcaa",
      "#ff9071",
      "#ff6439",
      "#ff3800",
      "#c62b00",
      "#8e1f00",
      "#551300",
      "#1c0600",
    ],
  },
  primaryColor: "primary",
  defaultRadius: "md",
  black: "#333333",
  primaryShade: 4,
  fontFamily: "Poppins",
  headings: { fontFamily: "Poppins", fontWeight: "bold" },
  // https://www.joshwcomeau.com/shadow-palette/
  shadows: {
    low: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.24),
  0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.24),
  0.9px 1.7px 2.2px -2.5px hsl(var(--shadow-color) / 0.24);`,
    medium: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.25),
  0.7px 1.5px 1.9px -0.8px hsl(var(--shadow-color) / 0.25),
  1.8px 3.5px 4.4px -1.7px hsl(var(--shadow-color) / 0.25),
  4.3px 8.5px 10.7px -2.5px hsl(var(--shadow-color) / 0.25);`,
    high: `0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.26),
  1.2px 2.5px 3.1px -0.4px hsl(var(--shadow-color) / 0.26),
  2.3px 4.7px 5.9px -0.8px hsl(var(--shadow-color) / 0.26),
  4px 8px 10.1px -1.2px hsl(var(--shadow-color) / 0.26),
  6.8px 13.6px 17.1px -1.7px hsl(var(--shadow-color) / 0.26),
  11.1px 22.3px 28px -2.1px hsl(var(--shadow-color) / 0.26),
  17.5px 35px 44px -2.5px hsl(var(--shadow-color) / 0.26);`,
  },
};

export default theme;

type ExtendedCustomColors = "primary" | "secondary" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
