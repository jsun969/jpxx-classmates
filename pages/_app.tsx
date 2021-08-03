import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import 'normalize.css';
import GithubCorner from '../components/GithubCorner';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GithubCorner />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
