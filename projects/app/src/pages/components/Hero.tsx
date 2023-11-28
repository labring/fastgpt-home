import { Box, Flex, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Flex flexDirection={'column'} pt={['24px', '50px']} alignItems={'center'} userSelect={'none'}>
      <Box fontSize={['38px', '60px']} fontWeight={'bold'}>
        {t('home.slogan')}
      </Box>
      <Box fontSize={['xl', '3xl']} py={5} color={'myGray.600'} textAlign={'center'} maxW={'400px'}>
        {t('home.desc')}
      </Box>
      <Flex zIndex={1} flexDirection={['column', 'row']} mt={[5, 8]}>
        <Button
          fontSize={['xl', '3xl']}
          h={['38px', 'auto']}
          borderRadius={'xl'}
          py={[2, 3]}
          w={'150px'}
          onClick={() => window.location.href = process.env.NEXT_PUBLIC_APP_LIST_URL || ""}
        >
          {t('home.Start Now')}
        </Button>
      </Flex>
      <Box mt={['', '50px']} position={'relative'}>
        <Image
          minH={['auto', '400px']}
          src={'/imgs/home/hero.png'}
          mx={['-10%', 'auto']}
          maxW={['120%', '800px']}
          alt=""
          draggable={false}
          loading={'lazy'}
        />
      </Box>
      {/* {showVideo && (
        <Flex
          position={'fixed'}
          zIndex={99}
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems={'center'}
          justifyContent={'center'}
          bg={'rgba(255,255,255,0.4)'}
          onClick={() => setShowVide(false)}
        >
          <Box
            w={['100vw', '50%']}
            borderRadius={'lg'}
            overflow={'hidden'}
            onClick={(e) => e.preventDefault()}
          >
            <video
              style={{
                margin: 'auto'
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              src={'https://otnvvf-imgs.oss.laf.run/fastgpt.mp4'}
              controls
              autoPlay
            />
          </Box>
        </Flex>
      )} */}
    </Flex>
  );
};

export default Hero;
