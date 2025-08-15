/* eslint-disable @next/next/no-img-element */
import { ALL_ABILITY } from "@/config/ability";
import { cn } from "@/lib/utils";
import React from "react";

const Ability = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const ABILITYS = ALL_ABILITY[`ABILITYS_${langName.toUpperCase()}`];

  return (
    <section id={id} className="flex flex-col justify-center gap-6 md:gap-12 py-6">
      <h4 className="text-center text-gradient">
        {/* <RoughNotation type="highlight" show={true} color="#2563EB"> */}
        {locale.title}
        {/* </RoughNotation> */}
      </h4>
      <div className="flex flex-col gap-6 relative">
        {ABILITYS?.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "p-6 rounded-xl overflow-hidden flex flex-wrap gap-y-6 justify-between items-center border-box"
            )}
            style={{
              color: "var(--ability-text)",
              ...(index === 0 && {
                background: "var(--theme-gradient-0)",
              }),
              ...(index === 1 && {
                background: "var(--theme-gradient-1)",
              }),
              ...(index === 2 && {
                background: "var(--theme-gradient-2)",
              }),
              ...(index === 3 && {
                background: "var(--theme-gradient-3)",
              }),
            }}
          >
            <div className="flex flex-col w-full lg:w-1/3 h-full text-[12px] md:text-[16px] whitespace-pre-wrap xl:ml-10">
              <div className="p-3 lg:p-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-5 dark:text-white rounded-2xl flex items-center justify-center border-box" style={{
                ...(index === 0 && { background: "var(--ability-icon-0)" }),
                ...(index === 1 && { background: "var(--ability-icon-1)" }),
                ...(index === 2 && { background: "var(--ability-icon-2)" }),
                ...(index === 3 && { background: "var(--ability-icon-3)" }),
              }}>
                {item.icon &&
                  React.createElement(item.icon, { className: "text-5xl text-white" })}
              </div>
              <h2
                className={cn(
                  "text-[16px] md:text-[28px] mb-2"
                )}
                style={{
                  ...(index === 0 && { color: "var(--ability-title-0)" }),
                  ...(index === 1 && { color: "var(--ability-title-1)" }),
                  ...(index === 2 && { color: "var(--ability-title-2)" }),
                  ...(index === 3 && { color: "var(--ability-title-3)" }),
                }}
              >
                {item.title}
              </h2>
              <p>{item.content}</p>
              {/* <a
                className={cn(
                  "lg:mt-14 hidden lg:block hover:text-[#1A5EFE] cursor-pointer"
                )}
              >
                {item.tip}
              </a> */}
            </div>
            <div className={cn("relative w-full lg:w-3/5 min-h-[150px] flex justify-center items-center rounded-lg overflow-hidden")}>
              <img src={item.image} alt="ABILITYS" style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} className="dark:hidden" />
              <img src={item.imageDark} alt="ABILITYS" style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} className="dark:block hidden" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ability;

