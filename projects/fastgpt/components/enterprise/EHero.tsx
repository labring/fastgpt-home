interface Props {
  locale: any;
}

const EHero = ({ locale }: Props) => {
  const heroLocale = locale['Hero'];

  return (
    <section id="EHero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 text-center">
      <div className='inline-block mx-auto border border-[rgba(179,220,229,0.40)] font-bold rounded-full px-6 py-3 text-[#B5E8FD] text-xs lg:text-sm bg-[linear-gradient(90deg,rgba(212,212,249,0.15)0%,rgba(55,55,214,0)100%)]' >
        <span className="text-[#F8A3FF]">100+&nbsp;</span>
        {heroLocale.maker}
      </div>

      <h1 className='flex justify-center items-center mt-6 text-xl sm:text-4xl md:text-5xl lg:text-6xl text-nowrap text-gradient'>
        {heroLocale.title}
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-[var(--text-secondary)] text-xs sm:text-sm md:text-base tracking-tight">
        {heroLocale.description}
      </p>
    </section>
  );
};

export default EHero;
