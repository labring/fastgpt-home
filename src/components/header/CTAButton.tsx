'use client';
import { Button } from '@/components/ui/button';
import { buildCloudEntryUrl } from '@/lib/cloudEntryUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

import Link from 'next/link';

const CTAButton = ({ locale }: { locale: any }) => {
  const getLinkConfig = () => {
    return buildCloudEntryUrl(
      'enterprise_footer_trial',
      typeof window === 'undefined' ? '' : window.location.search
    );
  };

  return (
    <div className="flex items-center gap-6">
      <Link
        href="https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1"
        target="_blank"
        rel="noopener noreferrer nofollow"
        {...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'enterprise_footer_consult')}
      >
        <Button
          variant="default"
          className="flex items-center gap-3 bg-[#B9DFFF] hover:bg-[#91C2EB] text-[#3941DD] px-6 py-4 text-sm ask-btn"
          aria-label="Get Boilerplate"
        >
          {locale.askTitle}
        </Button>
      </Link>
      <div className="inline-block rotating-border-button">
        <Link
          href={getLinkConfig()}
          rel="noopener noreferrer nofollow"
          {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, 'enterprise_footer_trial')}
        >
          <Button
            variant="default"
            className="flex items-center gap-3 bg-[#B9DFFF] hover:bg-[#91C2EB] text-[#3941DD] px-6 py-4 text-sm start-btn"
            aria-label="Get Boilerplate"
          >
            {locale.title}
            {/* <FaArrowRight className='text-base' /> */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTAButton;
