import { extendTheme } from '@chakra-ui/react'

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
      900: '#171717'
    },
    orange: {
      logo: '#ff4800'
    }
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans'
  },
  styles: {
    global: {
      "*": {
        _selection: {
          background: 'teal.300'
        }
      },
      body: {
        height: '100%',
        bg: 'white',
        color: 'gray.800'
      }
    }
  }
})