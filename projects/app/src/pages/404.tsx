import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const NonePage = () => {
  const router = useRouter();
  useEffect(() => {
    window.location.href = process.env.NEXT_PUBLIC_APP_LIST_URL || "";
  }, [router]);

  return <div></div>;
};

export default NonePage;
