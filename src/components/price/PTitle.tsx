export default function PTitle({ locale }: { locale: any }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-gradient text-transparent font-bold text-6xl sm:text-7xl tracking-tight text-stroke">
        {locale.chooseVersion}
      </h1>
      <p className="text-[#E6E7FFB2] text-stroke">{locale.freeUse}</p>
    </div>
  );
}
