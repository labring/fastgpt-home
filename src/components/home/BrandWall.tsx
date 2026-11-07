'use client';

import * as m from 'framer-motion/m';
import Image from 'next/image';
import SectionHeader from '@/components/home/SectionHeader';

type BrandWallT = { badge: string; title: string; subtitle: string };

const LOGO_DIR = '/images/home/brands/brands solo';
const logos = [
  ['image-143.png', '中国三峡集团'],
  ['image-151.png', '中国海关'],
  ['image-153.png', '招商证券'],
  ['image-157.png', '中电海康集团'],
  ['image-159.png', '宇视科技'],
  ['image-169.png', '欧派家居'],
  ['image-170.png', 'A.O.史密斯'],
  ['image-171.png', '雪花啤酒'],
  ['image-172.png', '360'],
  ['image-173.png', '徐工集团'],
  ['image-174.png', '金鹏电子'],
  ['image-175.png', '马瑞利'],
  ['image-176.png', '金溢科技'],
  ['image-186.png', '扬丰'],
  ['image-187.png', '齐鲁制药'],
  ['image-189.png', '鼎桥通信'],
  ['image-190.png', '华新水泥'],
  ['image-192.png', '金田铜业'],
  ['image-193.png', '中意人寿'],
  ['image-204.png', '香港教育大学'],
  ['image-209.png', '禧恩软件'],
  ['image-210.png', '世辉律师事务所'],
  ['image-222.png', '绿联'],
  ['image-223.png', '黄河勘测规划设计研究院'],
  ['image-224.png', '中电万维'],
  ['image-225.png', '上海城建集团'],
  ['image-226.png', '中水北方勘测设计研究'],
  ['image-230.png', '联通（福建）产业互联网'],
  ['image-234.png', '清华大学合肥公共安全研究院'],
  ['image-236.png', '湖南中烟物流'],
  ['image-237.png', '中国复合材料工业协会'],
  ['image-238.png', '四川川润动力设备'],
  ['image-239.png', '西北民族大学'],
  ['image-240.png', '上海邮电设计咨询研究院'],
  ['image-243.png', '中国电建'],
  ['image-245.png', '中国人民银行'],
  ['wps_doc_18.png', '渤海证券'],
  ['wps_doc_21.png', 'A.O.史密斯'],
  ['wps_doc_26.png', '山东航空'],
  ['wps_doc_75.png', '广州华商学院'],
  ['wps_doc_76.png', '天立教育'],
  ['wps_doc_78.png', '米课'],
  ['wps_doc_80.png', '昭昭医考'],
  ['wps_doc_81.png', '永赢金租'],
  ['wps_doc_82.png', '朝阳永续'],
  ['wps_doc_83.png', '建信融通'],
  ['wps_doc_88.png', '中大咨询'],
  ['wps_doc_92.png', '联邦制药']
] as const;

// Shrink these logos (card size unchanged)
const shrinkLogos = new Set([
  'image-151.png',
  'image-159.png',
  'wps_doc_18.png',
  'wps_doc_26.png',
  'wps_doc_82.png'
]);

// Extra-shrink logos
const extraShrinkLogos = new Set(['wps_doc_92.png']);

// Enlarge these logos (card size unchanged)
const enlargeLogos = new Set([
  'wps_doc_75.png',
  'image-240.png',
  'image-223.png',
  'wps_doc_88.png'
]);

function logoHeight(logo: string) {
  if (extraShrinkLogos.has(logo)) return 'h-[16px] md:h-[22px] lg:h-[26px]';
  if (shrinkLogos.has(logo)) return 'h-[18px] md:h-[24px] lg:h-[30px]';
  if (enlargeLogos.has(logo)) return 'h-[34px] md:h-[44px] lg:h-[50px]';
  return 'h-[26px] md:h-[34px] lg:h-[40px]';
}

export default function BrandWall({ t }: { t: BrandWallT }) {
  return (
    <section className="pt-[48px] pb-0 md:pt-[80px] bg-white">
      <div className="px-[16px] md:px-[32px]">
        <div
          className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto"
          style={{ marginBottom: 32 }}
        >
          <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />
        </div>
      </div>

      <div className="bg-light-bg">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 48px 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto py-6 md:py-10 lg:py-20"
        >
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-3 md:gap-3 lg:gap-3">
            {logos.map(([logo, name]) => (
              <div
                key={logo}
                className="flex items-center justify-center bg-white rounded-md h-[40px] md:h-[52px] lg:h-[64px]"
              >
                <Image
                  src={`${LOGO_DIR}/${logo}`}
                  alt={`${name} 公司 logo`}
                  width={160}
                  height={80}
                  loading="lazy"
                  className={`${logoHeight(logo)} w-auto object-contain select-none`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
