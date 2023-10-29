import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Layout from '@/components/Layout/Layout';
import SessionProvider from '@/components/SessionProvider';
import Head from 'next/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <MantineProvider>
      <Head>
        <title>Fill Us In | Information and resources for Palestine</title>
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}
