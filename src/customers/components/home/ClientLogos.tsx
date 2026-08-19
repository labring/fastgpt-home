import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "@/customers/lib/base-path";

type ClientLogo = {
  id: string;
  name: string;
  initials: string;
  imageUrl: string;
};

const clientLogos: ClientLogo[] = [
  {
    id: "cpc",
    name: "CPC",
    initials: "CPC",
    imageUrl: "/企业logo墙/logo-cpc.svg",
  },
  {
    id: "spic",
    name: "SPIC",
    initials: "SPIC",
    imageUrl: "/企业logo墙/logo-spic.svg",
  },
  {
    id: "logo-1",
    name: "合作企业 1",
    initials: "L1",
    imageUrl: "/企业logo墙/logo1.png",
  },
  {
    id: "logo-2",
    name: "合作企业 2",
    initials: "L2",
    imageUrl: "/企业logo墙/logo2.png",
  },
  {
    id: "logo-3",
    name: "合作企业 3",
    initials: "L3",
    imageUrl: "/企业logo墙/logo3.png",
  },
  {
    id: "logo-4",
    name: "合作企业 4",
    initials: "L4",
    imageUrl: "/企业logo墙/logo4.png",
  },
  {
    id: "logo-5",
    name: "合作企业 5",
    initials: "L5",
    imageUrl: "/企业logo墙/logo5.svg",
  },
  {
    id: "logo-6",
    name: "合作企业 6",
    initials: "L6",
    imageUrl: "/企业logo墙/logo6.png",
  },
];

export default function ClientLogos() {
  const [failedLogoIds, setFailedLogoIds] = useState<string[]>([]);

  const handleLogoImageError = (logoId: string) => {
    setFailedLogoIds((prev) => (prev.includes(logoId) ? prev : [...prev, logoId]));
  };

  return (
    <section className="mt-8 mb-4">
      <p className="text-center text-ink-sub dark:text-slate-400 font-medium mb-3">
        深受行业领军团队信赖
      </p>
      <div className="marquee-shell py-5">
        <div className="marquee-track">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="relative shrink-0 h-12 w-24 md:h-16 md:w-32 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              {logo.imageUrl && !failedLogoIds.includes(logo.id) ? (
                <Image
                  src={withBasePath(logo.imageUrl)}
                  alt={logo.name}
                  fill
                  sizes="(min-width: 768px) 128px, 96px"
                  className="object-contain"
                  onError={() => handleLogoImageError(logo.id)}
                />
              ) : (
                <div className="h-full w-24 flex items-center justify-center font-bold text-xl text-gray-400 dark:text-gray-300">
                  {logo.initials}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
