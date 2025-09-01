'use client';
import { ALL_FAQS } from '@/config/faqs';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

// update rough notation highlight
function triggerResizeEvent() {
  const event = new Event('resize');
  window.dispatchEvent(event);
}

const FAQ = ({ id, locale, langName }: { id: string; locale: any; langName: string }) => {
  const FAQS = ALL_FAQS[`FAQS_${langName.toUpperCase()}`];

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-[928px] items-center py-16 gap-12"
    >
      <div className="flex flex-col text-center">
        <h4 className="text-center text-gradient">
          {/* <RoughNotation type="highlight" show={true} color="#2563EB"> */}
          {locale.title}
          {/* </RoughNotation> */}
        </h4>
        <p className="text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
          {locale.description}
        </p>
      </div>
      <Accordion
        fullWidth
        keepContentMounted
        className="gap-3"
        itemClasses={{
          base: 'px-6 hover:!bg-white/50 bg-white/75 dark:!bg-white/10 hover:dark:!bg-white/20',
          title: 'font-medium text-[#0D2657] dark:text-white/80 text-sm md:text-base',
          trigger: 'py-5',
          content: 'pt-0 pb-6 text-sm text-default-500 text-[#455F93] dark:text-white/60'
        }}
        items={FAQS}
        selectionMode="multiple"
        variant="splitted"
        onSelectionChange={triggerResizeEvent}
      >
        {FAQS?.map((item) => (
          <AccordionItem
            key={item.title}
            indicator={(e) => (
              <span className="text-[#455F93] dark:text-white/60">
                {e.isOpen ? <MinusIcon className="rotate-90" /> : <PlusIcon />}
              </span>
            )}
            title={item.title}
          >
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
