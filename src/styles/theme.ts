import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      50: '#fcfcfd',
      100: '#f4f4f4',
      200: '#ebebeb',
      300: '#dbdbdb',
      400: '#b0b0b0',
      500: '#868686',
      600: '#5b5b5b',
      700: '#393939',
      800: '#202020',
      900: '#171717',
    },
    orange: {
      logo: '#ff4800',
    },
  },
  fonts: {
    heading: '"Source Sans Pro", sans-serif',
    body: '"Source Sans Pro", sans-serif',
  },
  styles: {
    global: {
      '*': {
        _selection: {
          background: 'orange.200',
        },
      },
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        bg: 'white',
        color: 'gray.800',
      },
      '#__next': {
        height: '100%',
      },
    },
  },
});
