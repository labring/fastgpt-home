import React, { useState } from 'react';
import { Image, Skeleton, ImageProps, Box } from '@chakra-ui/react';

export const MyImage = (props: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [succeed, setSucceed] = useState(false);
  return (
    <Box mx={'auto'} display={'inline-block'}>
      <Image
        borderRadius={'md'}
        alt={''}
        minH={'150px'}
        fallbackSrc={'/imgs/errImg.png'}
        fallbackStrategy={'onError'}
        cursor={succeed ? 'pointer' : 'default'}
        objectFit={'contain'}
        loading={'lazy'}
        onLoad={() => {
          setIsLoading(false);
          setSucceed(true);
        }}
        onError={() => setIsLoading(false)}
        onClick={() => {
          if (!succeed) return;
          window.open(props.src, '_blank');
        }}
        {...props}
      />
    </Box>
  );
};

export default React.memo(MyImage);
