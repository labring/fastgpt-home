'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/home/SectionHeader';

type BrandWallT = { badge: string; title: string; subtitle: string };

const LOGO_DIR = '/images/home/brands/brands solo';
const logos = [
  'image-143.png',
  'image-151.png',
  'image-153.png',
  'image-157.png',
  'image-159.png',
  'image-169.png',
  'image-170.png',
  'image-171.png',
  'image-172.png',
  'image-173.png',
  'image-174.png',
  'image-175.png',
  'image-176.png',
  'image-186.png',
  'image-187.png',
  'image-189.png',
  'image-190.png',
  'image-192.png',
  'image-193.png',
  'image-204.png',
  'image-209.png',
  'image-210.png',
  'image-222.png',
  'image-223.png',
  'image-224.png',
  'image-225.png',
  'image-226.png',
  'image-230.png',
  'image-234.png',
  'image-236.png',
  'image-237.png',
  'image-238.png',
  'image-239.png',
  'image-240.png',
  'image-243.png',
  'image-245.png',
  'wps_doc_18.png',
  'wps_doc_21.png',
  'wps_doc_26.png',
  'wps_doc_75.png',
  'wps_doc_76.png',
  'wps_doc_78.png',
  'wps_doc_80.png',
  'wps_doc_81.png',
  'wps_doc_82.png',
  'wps_doc_83.png',
  'wps_doc_88.png',
  'wps_doc_92.png'
];

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
  if (extraShrinkLogos.has(logo)) return 'h-[12px] md:h-[16px] lg:h-[19px]';
  if (shrinkLogos.has(logo)) return 'h-[14px] md:h-[18px] lg:h-[22px]';
  if (enlargeLogos.has(logo)) return 'h-[26px] md:h-[34px] lg:h-[38px]';
  return 'h-[20px] md:h-[26px] lg:h-[30px]';
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto py-6 md:py-10 lg:py-20"
        >
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2 md:gap-2 lg:gap-2">
            {logos.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center bg-white rounded-md h-[32px] md:h-[40px] lg:h-[48px]"
              >
                <Image
                  src={`${LOGO_DIR}/${logo}`}
                  alt=""
                  width={160}
                  height={80}
                  loading="lazy"
                  className={`${logoHeight(logo)} w-auto object-contain select-none`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
