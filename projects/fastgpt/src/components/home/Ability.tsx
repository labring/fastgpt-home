import { Box, BoxProps, Grid, useTheme } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { MyImage } from '@/components/MyImage';

const Ability = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage;

  const CardStyles: BoxProps = {
    pt: 4,
    borderRadius: 'xl',
    overflow: 'hidden',
    border: theme.borders.base
  };
  const TitleStyles: BoxProps = {
    px: 4,
    fontSize: ['xl', '28px'],
    fontWeight: 'bold'
  };
  const DescStyles: BoxProps = {
    px: 4,
    mt: 2,
    mb: 5,
    fontSize: ['sm', 'md'],
    whiteSpace: 'pre-wrap'
  };

  return (
    <Box>
      <Box
        className="textlg"
        py={['30px', '60px']}
        textAlign={'center'}
        fontSize={['22px', '30px']}
        fontWeight={'bold'}
      >
        {t('home.FastGPT Ability')}
      </Box>
      <Grid px={[5, 0]} gridTemplateColumns={['1fr', `500px 1fr`]} gridGap={6}>
        <Box
          {...CardStyles}
          backgroundImage={'linear-gradient(to bottom right, #00A9A6 0%, #33BABB 100%)'}
        >
          <Box {...TitleStyles} color={'white'}>
            {t('home.AI Assistant')}
          </Box>
          <Box {...DescStyles} color={'rgba(255,255,255,0.9)'}>
            {t('home.AI Assistant Desc')}
          </Box>
          <MyImage borderRadius={'none'} src={`/imgs/home/${lng}/ai_assiatant.png`} alt={''} />
        </Box>
        <Box
          {...CardStyles}
          pb={4}
          backgroundImage={'linear-gradient(120deg, #3370ff 0%, #4e83fd 100%)'}
        >
          <Box {...TitleStyles} color={'white'}>
            {t('home.Dateset')}
          </Box>
          <Box {...DescStyles} color={'rgba(255,255,255,0.9)'}>
            {t('home.Dateset Desc')}
          </Box>
          <MyImage
            src={`/imgs/home/${lng}/dataset_import.png`}
            w={'90%'}
            mx={'auto'}
            borderRadius={'lg'}
          />
        </Box>
      </Grid>
      <Grid mt={6} px={[5, 0]} gridTemplateColumns={['1fr', `1fr 500px`]} gridGap={6}>
        <Box {...CardStyles} backgroundImage={'linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)'}>
          <Box {...TitleStyles}>{t('home.Advanced Settings')}</Box>
          <Box {...DescStyles} fontSize={['sm', 'md']}>
            {t('home.Advanced Settings Desc')}
          </Box>
          <MyImage src={`/imgs/home/${lng}/advanced_settings.png`} alt={''} w={'90%'} mx={'auto'} />
        </Box>
        <Box
          {...CardStyles}
          pb={4}
          backgroundImage={'linear-gradient(to right, #FDCBB1 0%, #FEE5D8 100%)'}
        >
          <Box {...TitleStyles}>{t('home.OpenAPI')}</Box>
          <Box {...DescStyles}>{t('home.OpenAPI Desc')}</Box>
          <MyImage borderRadius={'none'} src={`/imgs/home/${lng}/openapi.png`} alt={''} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Ability;
