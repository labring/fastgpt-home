import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NonePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return <Box></Box>;
};

export default NonePage;
