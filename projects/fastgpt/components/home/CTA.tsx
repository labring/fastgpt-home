/* eslint-disable react/no-unescaped-entities */
import CTAButton from '@/components/home/CTAButton';
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

const CTA = ({ locale, CTALocale, stars }: { locale: any; CTALocale: any; stars: number }) => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const { authors, footerService, footerProducts, footerLinks } = siteConfig;


  const LogoFC = () => (<div className="flex items-center md:gap-x-12">
    <Link
      href="/"
      aria-label="FastGPT"
      title="FastGPT"
      className="flex items-center space-x-2 font-bold "
    >
      <Image
        alt={siteConfig.name}
        src="/logo.svg"
        className="w-14 h-14 bg-[#E9E9E9] p-2 rounded-xl dark:bg-opacity-20"
        width={32}
        height={32}
      />
    </Link>
  </div>)

  return (
    <footer className='w-full border-t-2 border-white/10 py-12 text-center'>
      <div className='md:hidden flex justify-center mb-5'><LogoFC /></div>

      <section className="relative flex flex-wrap w-full justify-center">
        <div className="flex flex-col gap-2 mb-6 items-center md:items-start md:flex-1">
          <h4 className="md:text-start text-gradient md:text-2xl text-base text-center">
            {locale.title.slice(0, 20)}
            <br />
            {locale.title.slice(20)}
          </h4>
          <p className="md:text-large text-white/50 text-wrap md:text-start text-xs text-center md:max-w-[70%]" >
            <span style={{ color: 'var(--text-primary)' }}>{locale.description1}&nbsp;</span>
            {locale.description2}
            <span style={{ color: 'var(--text-primary)' }}>&nbsp;{locale.description3}&nbsp;</span>
            {locale.description4}
            <span style={{ color: 'var(--text-primary)' }}>{locale.description5}&nbsp;</span>
            {locale.description6}
          </p>
        </div>
        <div className='md:absolute md:top-0 right-0'>
          <CTAButton locale={CTALocale} stars={stars} showGithub={false} />
        </div>
      </section>

      <section className='relative mt-12 text-xs'>
        <div className='flex flex-col gap-4 justify-center items-center md:absolute md:top-3 md:right-0 md:gap-8'>
          {/* <FooterProducts /> */}
          <div className='flex gap-8 text-white'>
            {footerProducts.map((product) => {
              return (
                <Link href={product.url} target="_blank" key={product.url}>
                  {product.name}
                </Link>
              );
            })}
          </div>
          {/* <FooterLinks /> */}
          <div className="w-full flex justify-center items-center text-white/75 md:justify-end gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex max-w-[24px] flex-col items-center justify-center"
              >
                {link.icon && React.createElement(link.icon, { className: 'text-2xl' })}
              </Link>
            ))}
          </div>
        </div>

        <div className='hidden md:block mb-8'><LogoFC /></div>
        <div className='flex flex-wrap justify-center text-white/65 md:justify-start mt-8 md:mt-0 '>
          <div className="flex space-x-2 text-nowrap gap-3">
            {footerService.map((product) => {
              return (
                <Link href={product.url} target="_blank" key={product.url}>
                  {product.name}
                </Link>
              );
            })}
          </div>
          <div className='hidden xs:block'>|</div>
          <div>
            <span>{`©${currentYear}`}&nbsp;</span>
            <Link href={authors[0].twitter || authors[0].url} target="_blank">
              {authors[0].name}
            </Link>
            <span>&nbsp;All rights reserved.</span>
            {process.env.NEXT_PUBLIC_FILING_ADDRESS && (
              <Link href={'https://beian.miit.gov.cn/'}>
                {process.env.NEXT_PUBLIC_FILING_ADDRESS}
              </Link>
            )}
          </div>
        </div>

      </section>
    </footer>
  );
};

export default CTA;
