'use client';

import { useState } from 'react';
import { Switch } from '@heroui/react';
import Check from '@/components/icons/check';
import { PRICE_PLANS_CLOUD, PRICE_PLANS_SELF, PRICE_PLANS_SELF_BUTTON_MAP } from '@/config/price';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

type Key = 'cloud' | 'self';

function formatCloudPrice(price: number, annual: boolean, locale: any) {
  const amount = String(annual ? price * 10 : price);
  const template = annual ? locale.yearPriceFormat : locale.monthPriceFormat;

  if (typeof template === 'string') {
    return template.replace('{{price}}', amount);
  }

  const unit = annual ? locale.yearUnit || 'year' : locale.monthUnit || 'month';
  return `¥${amount}/${unit}`;
}

function PPlanFeatureItem({
  children,
  annual,
  content,
  locale
}: {
  children?: React.ReactNode;
  annual?: boolean;
  content?: string | number;
  locale?: any;
}) {
  const description = (() => {
    if (typeof content === 'number') {
      return `${content * (annual ? 12 : 1)} ${locale.aiCredits}`;
    }
    return content;
  })();

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 mt-0.5">
        <Check />
      </div>
      {children ? (
        children
      ) : (
        <span style={{ fontSize: 16, lineHeight: '24px', color: '#475569' }}>{description}</span>
      )}
    </div>
  );
}

export default function PPlan({ langName, locale }: { langName: string; locale: any }) {
  const [deploy, setDeploy] = useState<Key>('cloud');
  const [annual, setAnnual] = useState(false);
  const cloudPlans = PRICE_PLANS_CLOUD[langName] || PRICE_PLANS_CLOUD.en;
  const selfPlans = PRICE_PLANS_SELF[langName] || PRICE_PLANS_SELF.en;

  return (
    <div className="flex flex-col gap-6">
      {/* Deploy toggle */}
      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full"
          style={{ backgroundColor: '#f5f6f8', padding: 4, gap: 8 }}
        >
          <button
            onClick={() => setDeploy('cloud')}
            className="rounded-full text-[14px] font-medium transition-all"
            style={{
              padding: '0 14px',
              height: 36,
              backgroundColor: deploy === 'cloud' ? '#ffffff' : 'transparent',
              color: deploy === 'cloud' ? '#020617' : 'rgb(71, 85, 105)',
              border: deploy === 'cloud' ? '1px solid #d4d4d4' : '1px solid transparent'
            }}
          >
            {locale.cloud}
          </button>
          <button
            onClick={() => setDeploy('self')}
            className="rounded-full text-[14px] font-medium transition-all"
            style={{
              padding: '0 14px',
              height: 36,
              backgroundColor: deploy === 'self' ? '#ffffff' : 'transparent',
              color: deploy === 'self' ? '#020617' : 'rgb(71, 85, 105)',
              border: deploy === 'self' ? '1px solid #d4d4d4' : '1px solid transparent'
            }}
          >
            {locale.self}
          </button>
        </div>
      </div>

      {/* Annual toggle */}
      {deploy === 'cloud' && (
        <div className="flex justify-center items-center gap-2">
          <span
            className="cursor-pointer select-none text-[14px]"
            style={{ color: annual ? 'rgb(71, 85, 105)' : '#020617' }}
            onClick={() => setAnnual((v) => !v)}
          >
            {locale.monthly}
          </span>
          <Switch
            size="sm"
            isSelected={annual}
            onValueChange={setAnnual}
            style={{ gap: 8 }}
            classNames={{ wrapper: 'bg-[#e8ebf0]' }}
          >
            <div className="flex items-center gap-2 text-[14px]">
              <span style={{ color: annual ? '#020617' : 'rgb(71, 85, 105)' }}>
                {locale.annual}
              </span>
              <span style={{ color: '#3b82f6' }} className="italic">
                {locale.pay10}
              </span>
            </div>
          </Switch>
        </div>
      )}

      {/* Cloud plans */}
      {deploy === 'cloud' ? (
        <div className="mt-[40px] grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {cloudPlans.map((item) => {
            return (
              <div
                key={item.key}
                className="flex flex-col gap-4 rounded-3xl transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                style={{
                  padding: 32,
                  border: '1px solid #f0f1f6',
                  backgroundColor: '#ffffff'
                }}
              >
                <div className="flex flex-col" style={{ gap: 24 }}>
                  <div className="flex items-center justify-between">
                    <h2
                      className={`${
                        langName === 'en' ? 'text-[18px]' : 'text-[24px]'
                      } font-normal m-0`}
                      style={{ color: '#020617' }}
                    >
                      {item.title}
                    </h2>
                    {item.key === 'advanced' && (
                      <span
                        className={`inline-block rounded-full font-medium leading-[18px] ${
                          langName === 'en' ? 'text-[10px]' : 'text-[12px]'
                        }`}
                        style={{
                          padding: langName === 'en' ? '4px 8px' : '6px 12px',
                          backgroundColor: '#f5f9ff',
                          color: '#3b82f6'
                        }}
                      >
                        {locale.popular}
                      </span>
                    )}
                  </div>
                  <h3 style={{ color: '#020617' }} className="text-[48px] font-normal m-0">
                    {typeof item.price === 'number'
                      ? formatCloudPrice(item.price, annual, locale)
                      : item.price}
                  </h3>
                  <p className="text-[16px] m-0" style={{ color: '#475569' }}>
                    {item.content}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f0f1f6', margin: '24px 0' }} />

                <div className="flex flex-col" style={{ gap: 16 }}>
                  {item.features.map((feature: string | number, index: number) => (
                    <PPlanFeatureItem
                      key={index}
                      content={feature}
                      annual={annual}
                      locale={locale}
                    />
                  ))}
                </div>

                {item.key !== 'custom' ? (
                  <Link href={siteConfig.userUrl} target="_blank" className="mt-auto pt-4">
                    <button
                      className="w-full py-2.5 rounded-full text-[14px] font-medium transition-colors"
                      style={{
                        backgroundColor: '#f5f6f8',
                        color: '#020617'
                      }}
                    >
                      {locale.upgrade}
                    </button>
                  </Link>
                ) : (
                  <Link href={siteConfig.customPlanUrl} target="_blank" className="mt-auto pt-4">
                    <button
                      className="w-full py-2.5 rounded-full text-[14px] font-medium transition-colors"
                      style={{
                        backgroundColor: '#020617',
                        color: '#ffffff'
                      }}
                    >
                      {locale.contact}
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Self-hosted plans */
        <div className="mt-[40px] grid lg:grid-cols-3 grid-cols-1 gap-5">
          {selfPlans.map((item) => {
            return (
              <div
                key={item.key}
                className="flex flex-col gap-4 rounded-3xl transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                style={{
                  padding: 32,
                  border: '1px solid #f0f1f6',
                  backgroundColor: '#ffffff'
                }}
              >
                <div className="flex flex-col" style={{ gap: 24 }}>
                  <h2
                    className={`${
                      langName === 'en' ? 'text-[18px]' : 'text-[24px]'
                    } font-normal m-0`}
                    style={{ color: '#020617' }}
                  >
                    {item.title}
                  </h2>
                  <h3 style={{ color: '#020617' }} className="text-[48px] font-normal m-0">
                    {item.price}
                  </h3>
                  <p className="text-[16px] m-0" style={{ color: '#475569' }}>
                    {item.content}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f0f1f6', margin: '24px 0' }} />

                <div className="flex flex-col" style={{ gap: 16 }}>
                  {item.key !== 'free' && (
                    <p className="font-semibold text-[16px] m-0" style={{ color: '#020617' }}>
                      {locale.allFeatures}
                    </p>
                  )}
                  {item.features.map((feature, index) => (
                    <PPlanFeatureItem key={index} content={feature} />
                  ))}
                  {item.key === 'commercial' && (
                    <PPlanFeatureItem>
                      <div className="flex items-center break-all">
                        <span>
                          {locale.moreFeatures}
                          &nbsp;
                          <Link
                            href="https://doc.fastgpt.io/docs/introduction/commercial"
                            target="_blank"
                            style={{ color: '#3b82f6' }}
                            className="underline"
                          >
                            {locale.moreFeaturesLink}
                          </Link>
                        </span>
                      </div>
                    </PPlanFeatureItem>
                  )}
                </div>

                <Link
                  href={PRICE_PLANS_SELF_BUTTON_MAP[item.key].href}
                  target="_blank"
                  className="mt-auto pt-4"
                >
                  <button
                    className="w-full py-2.5 rounded-full text-[14px] font-medium transition-colors"
                    style={{ backgroundColor: '#f5f6f8', color: '#020617' }}
                  >
                    {PRICE_PLANS_SELF_BUTTON_MAP[item.key][langName] || PRICE_PLANS_SELF_BUTTON_MAP[item.key].en}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
