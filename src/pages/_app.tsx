import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';

import 'focus-visible/dist/focus-visible';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
