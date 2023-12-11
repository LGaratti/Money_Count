import {
  extendTheme,
  theme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";

// export const COLOR_THEME = "primary";
export const COLOR_THEME = "default";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme(
  {
    ...theme,
    config,
  },
  withDefaultColorScheme({ colorScheme: `${COLOR_THEME}` })
);
