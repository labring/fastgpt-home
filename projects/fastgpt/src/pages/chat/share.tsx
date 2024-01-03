import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';

const share = ({ cloudDomain }: { cloudDomain: string }) => {
  useEffect(() => {
    if (cloudDomain) {
      location.replace(`${cloudDomain}${location.pathname}${location.search}`);
    }
  }, []);

  return <div>Waiting</div>;
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      cloudDomain: process.env.CLOUD_DOMAIN
    }
  };
};

export default share;
