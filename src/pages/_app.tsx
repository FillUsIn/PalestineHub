import "@/styles/globals.css";
import type { AppProps } from "next/app";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import Layout from "@/components/layout";

const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
