import { ALL_FEATURES } from "@/config/feature";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/react";
import React from "react";


const Feature = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const FEATURES = ALL_FEATURES[`FEATURES_${langName.toUpperCase()}`];
  return (
    <section
      id={id}
      className="flex flex-col justify-center lg:max-w-7xl md:max-w-5xl w-[90%] mx-auto py-6"
    >
      <h4 className="text-center text-gradient">
        {/* <RoughNotation type="highlight" show={true} color="#2563EB"> */}
        {locale.title}
        {/* </RoughNotation> */}
      </h4>
      <p
        className="text-center text-xl font-medium tracking-tight"
        style={{ color: 'var(--text-secondary)' }}
      >
        {locale.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {FEATURES?.map((feature, index) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center px-8 py-6 border-white/20 border rounded-xl  "
            style={{
              background: "var(--theme-gradient)"
            }}
          >
            <div className="p-3 w-14 h-14 mb-5 text-white rounded-xl flex items-center justify-center"
              style={{ background: "var(--feature-icon)" }}>
              {feature.icon &&
                React.createElement(feature.icon, { className: "text-2xl" })}
            </div>
            <h2 className={"text-xl font-semibold mb-2 "} style={{ color: "var(--feature-title)" }}>{feature.title}</h2>
            <p className="text-[#355189] dark:text-white/50">
              {feature.content}
            </p>
          </div>
        ))}
      </div>

      <div className="inline-block mx-auto border font-bold rounded-full px-6 py-3 text-xs lg:text-sm mt-10"
        style={{
          color: '#B5E8FD',
          background: 'linear-gradient(90deg, rgba(212, 212, 249, 0.15) 0%, rgba(55, 55, 214, 0.00) 100%)',
          border: '1px solid rgba(179, 220, 229, 0.40)',
        }}>
        <p className="text-center">
          {locale.doYouLike}&nbsp;
          <Link
            href={siteConfig.authors[0].twitter}
            underline="always"
            rel="noopener noreferrer nofollow"
            className="text-xs lg:text-sm"
            style={{ color: '#F8A3FF' }}
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Feature;

