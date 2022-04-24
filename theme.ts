import type {
  MantineThemeOverride,
  Tuple,
  DefaultMantineColor,
} from "@mantine/core";

const theme: MantineThemeOverride = {
  colors: {
    brand: [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
    secondary: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#f59f00",
      "#f08c00",
      "#e67700",
    ],
  },
  primaryColor: "brand",
  defaultRadius: "xl",
  fontFamily: "Baskerville",
  headings: { fontFamily: "Baskerville", fontWeight: "bold" },
};

export default theme;

type ExtendedCustomColors = "brand" | "secondary" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
