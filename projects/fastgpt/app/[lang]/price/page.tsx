import PFaq from '@/components/price/PFaq';
import PPlan from '@/components/price/PPlan';
import PTitle from '@/components/price/PTitle';

export default async function Index() {
  return (
    <div className="flex flex-col items-center gap-10 pb-10">
      <PTitle />

      <PPlan />

      <PFaq />
    </div>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'zh' }];
}
