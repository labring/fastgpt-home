import React, { useEffect, useMemo } from 'react';
import { Box, useColorMode, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLoading } from '@/web/common/hooks/useLoading';
import { useSystemStore } from '@/web/common/system/useSystemStore';
import { throttle } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// const UpdateInviteModal = dynamic(
//   () => import('@/components/support/user/team/UpdateInviteModal'),
//   { ssr: false }
// );


const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { colorMode, setColorMode } = useColorMode();
  const { Loading } = useLoading();
  const { loading, setScreenWidth, isPc, loadGitStar } = useSystemStore();

  const isChatPage = useMemo(
    () => router.pathname === '/chat' && Object.values(router.query).join('').length !== 0,
    [router.pathname, router.query]
  );

  useEffect(() => {
    if (colorMode === 'dark' && router.pathname !== '/chat') {
      setColorMode('light');
    }
  }, [colorMode, router.pathname, setColorMode]);

  useEffect(() => {
    const resize = throttle(() => {
      setScreenWidth(document.documentElement.clientWidth);
    }, 300);

    window.addEventListener('resize', resize);

    resize();
    loadGitStar();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [loadGitStar, setScreenWidth]);

  return (
    <>
      <Box h={'100%'} bg={'myWhite.600'}>
        {isPc === true && (
          <>
            <>
              <Box h={'100%'} overflow={'overlay'}>
                {children}
              </Box>
            </>
          </>
        )}
        {isPc === false && (
          <>
            <Box h={'100%'} display={['block', 'none']}>
                <Flex h={'100%'} flexDirection={'column'}>
                  <Box flex={'1 0 0'} h={0}>
                    {children}
                  </Box>
                </Flex>
            </Box>
          </>
        )}
      </Box>
      <Loading loading={loading} zIndex={9999} />
    </>
  );
};

export default Layout;
