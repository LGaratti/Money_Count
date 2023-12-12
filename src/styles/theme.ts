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
  },
);
