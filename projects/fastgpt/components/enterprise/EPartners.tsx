import { ALL_ENTERPRISE } from "@/config/enterprise";
import { NormalCardGrid, NormalSection } from ".";

interface Props {
  locale: any;
  langName: string;
}

const EPartners = ({ locale, langName }: Props) => {
  const partnersLocale = locale['Partners'];
  const partners = ALL_ENTERPRISE[`ENTERPRISE_PARTNERS_${langName.toUpperCase()}`];

  return (
    <NormalSection id="EPartners" title={partnersLocale.title} description={partnersLocale.description}>
      <NormalCardGrid items={partners} columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-4" />
    </NormalSection>
  );
};

export default EPartners;
