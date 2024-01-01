import React, { useEffect } from 'react';

const NonePage = ({ appUrl }: { appUrl: string }) => {
  useEffect(() => {
    window.location.href = '/';
  }, [appUrl]);

  return <div></div>;
};

export default NonePage;
