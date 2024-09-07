/* eslint-disable react/no-unescaped-entities */
import CTAButton from '@/components/home/CTAButton';

const CTA = ({ locale, CTALocale, stars }: { locale: any; CTALocale: any; stars: number }) => {
  return (
    <section className="flex justify-between items-start py-16 gap-12 w-[88%] border-t-2 border-white/10">
      <div className="flex flex-col">
        <h4 className="text-start text-gradient">
          {locale.title.slice(0, 20)}
          <br />
          {locale.title.slice(20)}
        </h4>
        <p className="text-large text-white/50">
          <span style={{ color: 'var(--text-primary)' }}>{locale.description1}&nbsp;</span>
          {locale.description2}
          <span style={{ color: 'var(--text-primary)' }}>&nbsp;{locale.description3}&nbsp;</span>
          {locale.description4}
          <br />
          <span style={{ color: 'var(--text-primary)' }}>{locale.description5}&nbsp;</span>
          {locale.description6}



          {/* <RoughNotation type="box" color="#b71c1c" show={true}>
            {locale.description1}
          </RoughNotation>
          {locale.description2}
          <RoughNotation type="box" color="#b71c1c" show={true}>
            {locale.description3}
          </RoughNotation>
          {locale.description4}
          <RoughNotation type="box" color="#b71c1c" show={true}>
            {locale.description5}
          </RoughNotation>
          {locale.description6} */}
        </p>
      </div>
      <CTAButton locale={CTALocale} stars={stars} showGithub={false} />
    </section>
  );
};

export default CTA;
