/* eslint-disable @next/next/no-img-element */
import { ALL_ABILITY } from "@/config/ability";
import { cn } from "@/lib/utils";
import { RoughNotation } from "react-rough-notation";

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
    <section
      id={id}
      className="flex flex-col justify-center lg:max-w-7xl md:max-w-5xl w-[95%] mx-auto md:gap-14 py-6"
    >
      <h2 className="text-center text-white">
        <RoughNotation type="highlight" show={true} color="#2563EB">
          {locale.title}
        </RoughNotation>
      </h2>
      <div className="grid grid-cols-1 grid-rows-1 gap-6 relative lg:grid-cols-2 lg:grid-rows-2">
        {ABILITYS?.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "p-4 rounded-xl overflow-hidden border"
            )}
            style={{
              ...(index === 0 && {
                backgroundImage:
                  "var(--theme-gradient-0)",
              }),
              ...(index === 1 && {
                backgroundImage:
                  "var(--theme-gradient-1)",
              }),
              ...(index === 2 && {
                backgroundImage:
                  "var(--theme-gradient-2)",
              }),
              ...(index === 3 && {
                backgroundImage:
                  "var(--theme-gradient-3)",
              }),
            }}
          >
            <h2
              className={cn(
                index === 1 && "text-blue-700",
                "text-[18px] md:text-[28px] font-bold"
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
            <p
              className={cn(
                "mt-2 md:mt-0 mb-5 text-[12px] md:text-[14px] whitespace-pre-wrap"
              )}
            >
              {item.content}
            </p>
            <div className={cn("w-full relative min-h-[150px] flex justify-center items-center")}>
              <img key={index} src={item.image} alt="ABILITYS" style={{ objectFit: "fill", maxHeight: "300px" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ability;

