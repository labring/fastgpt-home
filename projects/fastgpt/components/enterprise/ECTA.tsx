import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { NormalSection } from ".";
import { siteConfig } from "@/config/site";

interface Props {
  locale: any;
}

const ECTA = ({ locale }: Props) => {
  const ctaLocale = locale['CTA'];
  const commercial = siteConfig.commercial;

  return (
    <NormalSection id="ECTA" title={ctaLocale.title} description={ctaLocale.description}>
      <Link
        href={commercial}
        rel="noopener noreferrer nofollow"
        className="my-8 flex justify-center"
      >
        <Button
          variant="default"
          className="flex items-center gap-3 bg-[#B9DFFF] hover:bg-[#91C2EB] text-[#3941DD] px-6 py-4 text-sm"
          aria-label="Get Boilerplate"
        >
          {ctaLocale.link}
          <FaArrowRight className='text-base' />
        </Button>
      </Link>
    </NormalSection>
  );
};

export default ECTA;
