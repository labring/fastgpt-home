"use client";
'use client';

import { useState } from 'react';
import { Button, Switch, Tab, Tabs } from '@heroui/react';
import Check from '@/components/icons/check';
import { PRICE_PLANS_CLOUD, PRICE_PLANS_SELF, PRICE_PLANS_SELF_BUTTON_MAP } from '@/config/price';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

type Key = 'cloud' | 'self';

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
    <div className="flex gap-4 items-center">
      <div className="flex-shrink-0">
        <Check />
      </div>

      {children ? children : <span>{description}</span>}
    </div>
  );
}

export default function PPlan({ langName, locale }: { langName: string; locale: any }) {
  const [deploy, setDeploy] = useState<Key>('cloud');
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-11">
      <div className="flex justify-center">
        <Tabs
          color="primary"
          variant="bordered"
          selectedKey={deploy}
          classNames={{
            cursor: 'bg-[#B9DFFF]'
          }}
          onSelectionChange={(key) => setDeploy(key as Key)}
        >
          <Tab
            key="cloud"
            title={
              <div
                className={`${
                  deploy === 'cloud' ? 'w-[150px] text-[#3941DD]' : 'w-[110px]'
                } text-center transition-all font-semibold`}
              >
                <span>{locale.cloud}</span>
              </div>
            }
          />
          <Tab
            key="self"
            title={
              <div
                className={`${
                  deploy === 'self' ? 'w-[150px] text-[#3941DD]' : 'w-[110px]'
                } text-center transition-all font-semibold`}
              >
                <span>{locale.self}</span>
              </div>
            }
          />
        </Tabs>
      </div>

      {deploy === 'cloud' && (
        <div className="flex justify-center items-center gap-2">
          <div
            className="text-white text-sm cursor-pointer select-none"
            onClick={() => setAnnual((v) => !v)}
          >
            {locale.monthly}
          </div>
          <Switch size="sm" isSelected={annual} onValueChange={setAnnual}>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white">{locale.annual}</span>
              <span className="text-[#F8A3FF] italic">{locale.pay10}</span>
            </div>
          </Switch>
        </div>
      )}

      {deploy === 'cloud' ? (
        <div className={`grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5`}>
          {PRICE_PLANS_CLOUD[langName].map((item) => (
            <div
              key={item.key}
              className="p-7 border-[0.5px] rounded-[16px] border-white/50 bg-[#f1f4ff1a] w-[300px] flex flex-col gap-4"
            >
              <h2 className="text-[16px] font-bold m-0">{item.title}</h2>
              <h3 style={{ color: '#fff' }} className="text-[42px] m-0">
                {typeof item.price === 'number' ? `¥${item.price * (annual ? 10 : 1)}` : item.price}
              </h3>
              <p className={`text-sm text-white/50 ${langName !== 'zh' ? 'h-[60px]' : 'h-[40px]'}`}>
                {item.content}
              </p>

              {item.key !== 'custom' ? (
                <Link href={siteConfig.userUrl} target="_blank">
                  <Button color="primary" size="sm" className="w-full bg-[#487FFF] rounded-[6px]">
                    {locale.upgrade}
                  </Button>
                </Link>
              ) : (
                <Link href={siteConfig.customPlanUrl} target="_blank">
                  <Button color="primary" size="sm" className="w-full bg-[#487FFF] rounded-[6px]">
                    {locale.contact}
                  </Button>
                </Link>
              )}

              <div className="flex flex-col gap-2">
                {item.features.map((feature: string, index: number) => (
                  <PPlanFeatureItem key={index} content={feature} annual={annual} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid lg:grid-cols-3 grid-cols-1 gap-5`}>
          {PRICE_PLANS_SELF[langName].map((item) => {
            return (
              <div
                key={item.key}
                className="p-7 border-[0.5px] rounded-[16px] border-white/50 bg-[#f1f4ff1a] w-[340px] flex flex-col gap-4"
              >
                <h2 className="text-[16px] font-bold m-0">{item.title}</h2>
                <h3
                  style={{ color: '#fff' }}
                  className={`text-[42px] m-0 ${langName !== 'zh' ? 'h-[84px]' : ''} break-all`}
                >
                  {item.price}
                </h3>
                <p className="text-sm text-white/50 h-[40px]">{item.content}</p>

                <Link href={PRICE_PLANS_SELF_BUTTON_MAP[item.key].href} target="_blank">
                  <Button size="sm" color="primary" className="w-full" radius="sm">
                    {PRICE_PLANS_SELF_BUTTON_MAP[item.key][langName]}
                  </Button>
                </Link>

                <div className="flex flex-col gap-2">
                  {item.key !== 'free' && (
                    <p className="font-semibold text-[16px]">{locale.allFeatures}</p>
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
                            className="text-[#487FFF] underline"
                          >
                            {locale.moreFeaturesLink}
                          </Link>
                        </span>
                      </div>
                    </PPlanFeatureItem>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
