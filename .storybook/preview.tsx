import '@mantine/core/styles.css';
import '../src/styles/globals.css';

import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';

import type { Preview } from '@storybook/react';

import Head from 'next/head';
import Layout from '../src/components/layout';
import { theme } from '../src/styles/theme';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ColorSchemeWrapper>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ColorSchemeWrapper>
    ),
    (Story) => (
      <MantineProvider theme={theme}>
        <Head>
          <title>Fill Us In | Information and resources for Palestine</title>
        </Head>
        <Layout>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </Layout>
      </MantineProvider>
    ),
  ],
};

export default preview;
