import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Ability from '@/components/home/Ability';
import Choice from '@/components/home/Choice';
import Footer from '@/components/home/Footer';
import { UserConfig } from 'next-i18next';

const Home = (e: {
  _nextI18Next?:
    | {
        initialI18nStore: any;
        initialLocale: string;
        ns: string[];
        userConfig: UserConfig | null;
      }
    | undefined;
  beian: string;
  docUrl: string;
  statusUrl: string;
  cloudDomain: string;
}) => {
  const { beian, docUrl, statusUrl, cloudDomain } = e;

  return (
    <>
      <Box id="home" bg={'myWhite.600'} h={'100vh'} overflowY={'auto'} overflowX={'hidden'}>
        <Box position={'fixed'} zIndex={10} top={0} left={0} right={0}>
          <Navbar docUrl={docUrl} cloudDomain={cloudDomain} />
        </Box>
        <Box maxW={'1200px'} pt={'70px'} m={'auto'}>
          <Hero cloudDomain={cloudDomain} />
          <Ability />
          <Box my={[4, 6]}>
            <Choice />
          </Box>
        </Box>
        <Box bg={'white'}>
          <Footer beian={beian} docUrl={docUrl} statusUrl={statusUrl} cloudDomain={cloudDomain} />
        </Box>
      </Box>
    </>
  );
};
export default Home;

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      beian: process.env.BEIAN || '',
      docUrl: process.env.DOC_URL || '',
      statusUrl: process.env.STATUS_URL || '',
      cloudDomain: process.env.CLOUD_DOMAIN || 'https://cloud.fastgpt.in',
      ...(await serverSideTranslations(locale))
    }
  };
};
