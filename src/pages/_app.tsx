import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';
import Layout from '@/components/Layout/Layout';
import SessionProvider from '@/components/SessionProvider';
import Head from 'next/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <MantineProvider>
      <Notifications />
      <Head>
        <title>Fill Us In | Information and resources for Palestine</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}
