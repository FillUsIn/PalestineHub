import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <ColorSchemeScript defaultColorScheme='auto' />
        <link rel='icon' href='/favicon.png' sizes='any' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
