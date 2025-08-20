'use client';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { FaArrowRight } from "react-icons/fa6";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CTAButton = ({ locale, stars: initialStars }: { locale: any; stars: number }) => {
  const [stars, setStars] = useState(initialStars);

  useEffect(() => {
    const getStars = async () => {
      try {
        const { stargazers_count } = await (
          await fetch('https://api.github.com/repos/labring/FastGPT')
        ).json();
        if (stargazers_count && stargazers_count !== initialStars) {
          setStars(stargazers_count);
        }
      } catch (error) { }
    };
    getStars();
  }, [initialStars]);

  const getLinkConfig = () => {
    if (typeof window === 'undefined') return { pathname: siteConfig.userUrl };
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const bd_vid = urlParams.get('bd_vid');
    const msclkid = urlParams.get('msclkid');
    const k = urlParams.get('k');
    return {
      pathname: siteConfig.userUrl,
      query: {
        ...(search && { search }),
        ...(bd_vid && { bd_vid }),
        ...(msclkid && { msclkid }),
        ...(k && { k })
      }
    };
  };

  return (
    <div className="flex items-center gap-6">
      <Link
        href="https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Button
          variant="default"
          className="flex items-center gap-3 bg-[#B9DFFF] hover:bg-[#91C2EB] text-[#3941DD] px-6 py-4 text-sm ask-btn"
          aria-label="Get Boilerplate"
        >
          {locale.askTitle}
        </Button>
      </Link>
      <div className="inline-block rotating-border-button">
        <Link
          href={getLinkConfig()}
          rel="noopener noreferrer nofollow"
        >
          <Button
            variant="default"
            className="flex items-center gap-3 bg-[#B9DFFF] hover:bg-[#91C2EB] text-[#3941DD] px-6 py-4 text-sm start-btn"
            aria-label="Get Boilerplate"
          >
            {locale.title}
            {/* <FaArrowRight className='text-base' /> */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTAButton;
