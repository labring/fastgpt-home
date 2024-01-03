import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { config } from '@/constants';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ability from './components/Ability';
import Choice from './components/Choice';
import Footer from './components/Footer';

const Home = ({ cloudDomain }: { cloudDomain: string }) => {
  useEffect(() => {
    config.startUrl = `${cloudDomain}/app/list`;
    config.loginUrl = `${cloudDomain}/login`;
  }, [cloudDomain]);

  return (
    <>
      <Box id="home" bg={'myWhite.600'} h={'100vh'} overflowY={'auto'} overflowX={'hidden'}>
        <Box position={'fixed'} zIndex={10} top={0} left={0} right={0}>
          <Navbar />
        </Box>
        <Box maxW={'1200px'} pt={'70px'} m={'auto'}>
          <Hero />
          <Ability />
          <Box my={[4, 6]}>
            <Choice />
          </Box>
        </Box>
        <Box bg={'white'}>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      cloudDomain: process.env.CLOUD_DOMAIN || 'cloud.fastgpt.in'
    }
  };
}

export default Home;
