import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/web/styles/theme';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { change2DefaultLng, setLngStore } from '@/web/common/utils/i18n';
import { config } from '@/constants';

import '@/web/styles/reset.scss';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // get default language
    const targetLng = change2DefaultLng(i18n.language);
    if (targetLng) {
      setLngStore(targetLng);
      router.replace(router.asPath, undefined, { locale: targetLng });
    }
  }, []);

  return (
    <>
      <Head>
        <title>FastGPT</title>
        <meta name="description" content={t('meta desc')} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>
      {config?.scripts?.map((item, i) => <Script key={i} strategy="lazyOnload" {...item}></Script>)}

      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

// @ts-ignore
export default appWithTranslation(App);
