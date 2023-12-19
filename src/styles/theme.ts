import {
  extendTheme,
  theme,
  withDefaultColorScheme,
  type ThemeConfig,
  createMultiStyleConfigHelpers
} from "@chakra-ui/react";
import { switchAnatomy } from '@chakra-ui/anatomy';

export const COLOR_THEME = "primary";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const switchTheme = definePartsStyle({
  container: {
    position: 'relative',
  },
  thumb: {
    _before: {
      content: '""',
    },
  },
  track: {
    bg: 'primary.500',
    _checked: {
      bg: 'primary.900'
    }
  },
});

const switchStyles = defineMultiStyleConfig({
  variants: {
    switchTheme:switchTheme
  }
});

export default extendTheme(
  {
    ...theme,
    config,
    components: {
      Switch: switchStyles
    },
    styles: {
      global: {
        body: {
          background: `pageBackground1`,
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        },
      },
    },
    colors: {
      brand:{
        100: "#40a664",
        900: "#781cca"
      },
      primary:{
        50: '#e5fbee',
        100: '#c4ebd2',
        200: '#a1ddb6',
        300: '#7dcd96',
        400: '#59bf76',
        500: '#40a664',
        600: '#308152',
        700: '#205c3e',
        800: '#0f3827',
        900: '#00140a',
      },
      secondary:{
        50: '#f6e6ff',
        100: '#dcbaf8',
        200: '#c28ef1',
        300: '#aa61ea',
        400: '#9234e3',
        500: '#781cca',
        600: '#5e159d',
        700: '#430e71',
        800: '#280845',
        900: '#0f011b',
      }
    },
    fonts: {
      heading: `'Outfit Variable', sans-serif`,
      body: `'Outfit Variable', sans-serif`,
    },
    semanticTokens: {
      colors: {
        secondary: "#781cca",
        pageBackground1: `${COLOR_THEME}.100`,
      },
    },
  },
)

withDefaultColorScheme({
  colorScheme: COLOR_THEME,
  components: ['Switch']
})(theme)


