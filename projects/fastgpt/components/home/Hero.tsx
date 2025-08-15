'use client';
import { Button } from '@/components/ui/button';
import CTAButton from '@/components/home/CTAButton';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Hero = ({ locale, CTALocale, stars: initialStars }: { locale: any; CTALocale: any; stars: number }) => {
  const [stars, setStars] = useState(initialStars);
  const githubLogoSty = {
    height: '23px',
    width: '23px'
  };

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1],
          scale: {
            type: 'tween' // tween spring
            // damping: 10, // if spring
            // stiffness: 50, // if spring
            // restDelta: 0.001, // if spring
          }
        }}
      >
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 text-center">
          <div className='inline-block mx-auto border font-bold rounded-full px-6 py-3 text-xs lg:text-sm'
            style={{
              color: '#B5E8FD',
              background: 'linear-gradient(90deg, rgba(212, 212, 249, 0.15) 0%, rgba(55, 55, 214, 0.00) 100%)',
              // border: '1px solid rgba(179, 220, 229, 0.40)',
              border: 'none',
            }}
          >
            <span style={{ color: '#F8A3FF' }}>40w+&nbsp;</span>
            {locale.maker}
          </div>
          <div className="inline-block hero-github-pos">
            <Link
              href="https://github.com/labring/FastGPT"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Button className="flex gap-3 cursor-pointer font-semibold text-sm px-6 py-4 bg-[transparent] hover:bg-[#000a28]">
                <svg aria-hidden="true" focusable="false" className="octicon octicon-mark-github" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" display="inline-block" overflow="visible" style={githubLogoSty}>
                  <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path></svg>
                {(stars / 1000).toFixed(1)}k
              </Button>
            </Link>
          </div>
          <h1 className='flex justify-center items-center gap-3 md:gap-4 lg:gap-6 mt-6 text-xl sm:text-4xl md:text-5xl lg:text-6xl text-nowrap text-gradient big-titile-padding'>
            {locale.title1}
            {/* <Image src="/AI.png" alt="logo" width={100}
              height={100} className='w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 lg:w-20 lg:h-16' /> */}
            {/* <LineText>{locale.title2}</LineText>  */}
            {locale.title3}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-s sm:text-sm md:text-xl tracking-tight" style={{ color: 'var(--text-secondary)' }}>
            {locale.description}
          </p>
        </section>
      </motion.div>
      <CTAButton locale={CTALocale} stars={stars} />
    </>
  );
};

export default Hero;
