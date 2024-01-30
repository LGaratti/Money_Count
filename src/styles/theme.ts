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

var Calendar = {
  parts: ['calendar', 'months'],
  baseStyle: {
    calendar: {
      position: 'relative',
      w: 'min-content',
      borderWidth: '1px',
      rounded: 'md',
      shadow: 'lg',
      bg:'white.100'
    },
    months: {
      // p: 4,
      w: '100%',
      gridTemplateColumns: '1fr 1fr',
      bg:'purple.200'
    }
  }
};

var CalendarMonth = {
  parts: ['month', 'name', 'week', 'weekday', 'days'],
  baseStyle: {
    name: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    week: {
      gridTemplateColumns: 'repeat(7, 1fr)'
    },
    weekday: {
      color: 'gray.500',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    days: {
      gridTemplateColumns: 'repeat(7, 1fr)'
    }
  },
  defaultProps: {
    name: {
      as: 'h2'
    }
  }
};

var CalendarDay = {
  baseStyle: {
    rounded: 'none',
    // bgColor: 'transparent',
    _hover: {
      bgColor: 'gray.100'
    },
    _disabled: {
      color: 'gray.200',
      _hover: {
        cursor: 'initial',
        bgColor: 'transparent'
      }
    }
  },
  sizes: {
    sm: {
      h: 8
    }
  },
  variants: {
    selected: {
      bgColor: 'purple.400',
      color: 'white',
      _hover: {
        bgColor: 'purple.300'
      }
    },
    range: {
      bgColor: 'purple.200',
      color: 'white',
      _hover: {
        bgColor: 'purple.100'
      },
      _disabled: {
        _hover: {
          bgColor: 'purple.300'
        }
      }
    },
    outside: {
      color: 'gray.300'
    },
    today: {
      bgColor: 'pink.100',
      _hover: {
        bgColor: 'pink.200'
      }
    }
  },
  defaultProps: {
    size: 'sm'
  }
};

var CalendarControl = {
  parts: ['controls', 'button'],
  baseStyle: {
    controls: {
      position: 'absolute',
      // p: 4,
      w: '100%',
      justifyContent: 'space-between'
    },
    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: 'md',
      rounded: 'md'
    }
  }
};

export default extendTheme(
  {
    ...theme,
    config,
    components: {
      Switch: switchStyles,
      Calendar: Calendar,
      CalendarMonth: CalendarMonth,
      CalendarDay: CalendarDay,
      CalendarControl: CalendarControl
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


