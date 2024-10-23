'use client';
import CTAButton from '@/components/home/CTAButton';
import { motion } from 'framer-motion';
import Image from "next/image";

const Hero = ({ locale, CTALocale, stars }: { locale: any; CTALocale: any; stars: number }) => {
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
              border: '1px solid rgba(179, 220, 229, 0.40)',
            }}
          >
            <span style={{ color: '#F8A3FF' }}>20w+&nbsp;</span>
            {locale.maker}
          </div>

          <h1 className='flex justify-center items-center gap-3 md:gap-4 lg:gap-6 mt-6 text-xl sm:text-4xl md:text-5xl lg:text-6xl text-nowrap text-gradient'>
            {locale.title1}
            <Image src="/AI.png" alt="logo" width={100}
              height={100} className='w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 lg:w-20 lg:h-16' />
            {/* <LineText>{locale.title2}</LineText>  */}
            {locale.title3}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xs sm:text-sm md:text-base tracking-tight" style={{ color: 'var(--text-secondary)' }}>
            {locale.description}
          </p>
        </section>
      </motion.div>
      <CTAButton locale={CTALocale} stars={stars} />
    </>
  );
};

export default Hero;
