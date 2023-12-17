import {
  extendTheme,
  theme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme(
  {
    ...theme,
    config,
    fonts: {
      heading: `'Outfit Variable', sans-serif`,
      body: `'Outfit Variable', sans-serif`,
    },
    colors: {
      primary: {
        15: "#F3F3D7",
        25: "#DDDDBC",
        50: "#E4E494",
        100: "#D3D16B",
        200: "#85BC6B",
        300: "#4CBA6B",
        400: "#528D47",
        500: "#325A34",
        600: "#22431C",
        700: "#263927",
        800: "#242D25",
        900: "#2F3630",
      },
      secondary: {
        15: "#D6D3DF",
        25: "#BDB7D0",
        50: "#BFB0D3",
        100: "#9C8BCC",
        200: "#8783BF",
        300: "#726CBD",
        400: "#7C50A3",
        500: "#410E6E",
        600: "#381A53",
        700: "#322141",
        800: "#2B282E",
        900: "#332F36",
      }
    },
  },
);
