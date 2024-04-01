import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
  semanticTokens: {
    colors: {
      secondary: {
        default: 'green.500',
      },
      hover: {
        default: 'green.800',
      },
      tertiary: {
        default: 'teal.500',
      },
      text: {
        default: 'white',
      },
    },
  },
});

export default theme;
