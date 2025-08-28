'use client';

import { useState } from 'react';
import { Button, Switch, Tab, Tabs } from '@nextui-org/react';
import Check from '@/components/icons/check';
import { PRICE_PLANS_CLOUD, PRICE_PLANS_SELF, PRICE_PLANS_SELF_BUTTON_MAP } from '@/config/price';
import Link from 'next/link';

type Key = 'cloud' | 'self';

function PPlanFeatureItem({ content }: { content: string }) {
  return (
    <div className="flex gap-4 items-center">
      <Check />

      <span>{content}</span>
    </div>
  );
}

export default function PPlan() {
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
                  deploy === 'cloud' ? 'w-[120px] text-[#3941DD]' : 'w-[70px]'
                } text-center transition-all font-semibold`}
              >
                <span>云服务</span>
              </div>
            }
          />
          <Tab
            key="self"
            title={
              <div
                className={`${
                  deploy === 'self' ? 'w-[120px] text-[#3941DD]' : 'w-[70px]'
                } text-center transition-all font-semibold`}
              >
                <span>私有部署</span>
              </div>
            }
          />
        </Tabs>
      </div>

      <div className="flex justify-center">
        <Switch size="sm" isSelected={annual} onValueChange={setAnnual}>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white">按年付费</span>
            <span className="text-[#F8A3FF] italic">支付10个月，畅享一年！</span>
          </div>
        </Switch>
      </div>

      {deploy === 'cloud' ? (
        <div className={`grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5`}>
          {PRICE_PLANS_CLOUD.map((item) => (
            <div
              key={item.key}
              className="p-7 border-[0.5px] rounded-[16px] border-white/50 bg-[#f1f4ff1a] w-[300px] flex flex-col gap-4"
            >
              <h2 className="text-[16px] font-bold m-0">{item.title}</h2>
              <h3 style={{ color: '#fff' }} className="text-[42px] m-0">
                ¥{item.price * (annual ? 10 : 1)}
              </h3>
              <p className="text-sm text-white/50 h-[40px]">{item.content}</p>

              <Link href="https://cloud.fastgpt.cn/login" target="_blank">
                <Button
                  color="primary"
                  size="sm"
                  className="w-full bg-[#487FFF] rounded-[6px]"
                  isDisabled={item.key === 'free'}
                >
                  升级套餐
                </Button>
              </Link>

              <div className="flex flex-col gap-2">
                {item.features.map((feature, index) => (
                  <PPlanFeatureItem key={index} content={feature} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid md:grid-cols-3 grid-cols-1 gap-5`}>
          {PRICE_PLANS_SELF.map((item) => (
            <div
              key={item.key}
              className="p-7 border-[0.5px] rounded-[16px] border-white/50 bg-[#f1f4ff1a] w-[340px] flex flex-col gap-4"
            >
              <h2 className="text-[16px] font-bold m-0">{item.title}</h2>
              <h3 style={{ color: '#fff' }} className="text-[42px] m-0">
                {item.price}
              </h3>
              <p className="text-sm text-white/50 h-[40px]">{item.content}</p>

              <Link href={PRICE_PLANS_SELF_BUTTON_MAP[item.key].href} target="_blank">
                <Button size="sm" color="primary" className="w-full" radius="sm">
                  {PRICE_PLANS_SELF_BUTTON_MAP[item.key].title}
                </Button>
              </Link>

              <div className="flex flex-col gap-2">
                {item.features.map((feature, index) => (
                  <PPlanFeatureItem key={index} content={feature} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
