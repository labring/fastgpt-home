import React, { useEffect } from 'react';

const share = ({ cloudDomain }: { cloudDomain: string }) => {
  useEffect(() => {
    if (cloudDomain) {
      location.replace(`${cloudDomain}${location.pathname}${location.search}`);
    }
  }, []);

  return <div>Waiting</div>;
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      cloudDomain: process.env.CLOUD_DOMAIN
    }
  };
};

export default share;
