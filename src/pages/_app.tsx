import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import Layout from '@/components/layout';
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
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}
