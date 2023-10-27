import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import Layout from '@/components/layout';
import { theme } from '@/styles/theme';
import { MantineProvider, createTheme } from '@mantine/core';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Fill Us In | Information and resources for Palestine</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
