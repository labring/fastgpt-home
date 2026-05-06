'use client';

const logos: { src: string; width: number; height: number; alt: string }[] = [
  { src: '/images/home/trust/logo-cpc.svg', width: 118, height: 48, alt: '中国电建 PowerChina' },
  { src: '/images/home/trust/logo-spic.svg', width: 83, height: 48, alt: '国家电投 SPIC' },
  { src: '/images/home/trust/logo1.png', width: 190, height: 31, alt: 'TCL 华星' },
  { src: '/images/home/trust/logo2.png', width: 132, height: 34, alt: '中国三峡 China Three Gorges' },
  { src: '/images/home/trust/logo3.png', width: 72, height: 37, alt: '雪花' },
  { src: '/images/home/trust/logo4.png', width: 104, height: 34, alt: 'SANGFOR 深信服' },
  { src: '/images/home/trust/logo5.svg', width: 113, height: 48, alt: '中科曙光' },
  { src: '/images/home/trust/logo6.png', width: 103, height: 34, alt: 'CETC 中电海康集团' }
];

export default function TrustedBy({ t }: { t: { caption: string } }) {
  const loopedLogos = [...logos, ...logos];

  return (
    <div className="py-[80px] overflow-hidden">
      <div className="max-w-[min(85vw,1300px)] mx-auto flex flex-col gap-[48px]">
        <p className="text-center text-ink-sub font-medium">{t.caption}</p>
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)'
          }}
        >
          <div
            className="flex animate-marquee items-center w-max gap-x-8 md:gap-x-[54px]"
          >
            {loopedLogos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{
                  width: logo.width,
                  height: logo.height,
                  flexShrink: 0
                }}
                className="object-contain select-none origin-center scale-75 md:scale-100"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
