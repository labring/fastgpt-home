import { Box, Flex, Button, Image, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import MyIcon from '@/components/Icon';
import { useRouter } from 'next/router';
import axios from 'axios';
import { config } from '@/constants';

const Hero = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage;
  const [star, setStar] = useState(7900);
  const [showVideo, setShowVide] = useState(false);
  const [isPc] = useMediaQuery('(min-width: 900px)');

  useEffect(() => {
    (async () => {
      const { data: git } = await axios.get('https://api.github.com/repos/labring/FastGPT');
      setStar(git.stargazers_count);
    })();
  }, []);

  return (
    <Flex
      flexDirection={'column'}
      pt={['24px', '50px']}
      alignItems={'center'}
      userSelect={'none'}
      whiteSpace={'pre-wrap'}
      lineHeight={1.2}
    >
      <Box fontSize={['34px', '48px']} fontWeight={'bold'} textAlign={'center'}>
        {t('home.slogan')}
      </Box>
      <Box
        fontSize={['xl', '2xl']}
        py={8}
        color={'myGray.600'}
        textAlign={'center'}
        maxW={['250px', '100%']}
      >
        {t('home.desc')}
      </Box>
      <Flex zIndex={1} flexDirection={['column', 'row']} mt={5}>
        <Button
          mr={[0, 5]}
          mb={[5, 0]}
          fontSize={['xl', '2xl']}
          h={'auto'}
          py={[2, 3]}
          variant={'whitePrimary'}
          border={'2px solid'}
          borderColor={'myGray.800'}
          transition={'0.3s'}
          borderRadius={'xl'}
          _hover={{
            bg: 'myGray.800',
            color: 'white'
          }}
          leftIcon={<MyIcon name={'git'} w={'20px'} />}
          onClick={() => window.open('https://github.com/labring/FastGPT', '_blank')}
        >
          Stars {(star / 1000).toFixed(1)}k
        </Button>
        <Button
          fontSize={['xl', '2xl']}
          h={['38px', 'auto']}
          borderRadius={'xl'}
          py={[2, 3]}
          w={'150px'}
          onClick={() => window.open(config?.startUrl, '_self')}
        >
          {t('home.Start Now')}
        </Button>
      </Flex>
      <Box mt={['', '-50px']} position={'relative'}>
        <Image
          minH={['auto', '400px']}
          src={isPc ? `/imgs/home/${lng}/videobgpc.png` : `/imgs/home/${lng}/videobgphone.png`}
          mx={['0', 'auto']}
          minW={['100%', '800px']}
          maxW={['100%', '1000px']}
          alt=""
          draggable={false}
          loading={'lazy'}
        />
        <MyIcon
          name={'playFill'}
          position={'absolute'}
          w={['30px', '40px']}
          cursor={'pointer'}
          mt={['-10px', 0]}
          left={'50%'}
          top={'50%'}
          color={'#363c42b8'}
          transform={['translate(-50%,5px)', 'translate(-50%,40px)']}
          onClick={() => setShowVide(true)}
        />
      </Box>
      {showVideo && (
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
      )}
    </Flex>
  );
};

export default Hero;
